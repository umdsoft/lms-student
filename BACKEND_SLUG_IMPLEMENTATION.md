# Backend Implementation: Course Slug-Based Routing

## Overview
This document provides instructions for implementing slug-based routing for courses in the backend API. This enhancement improves security by not exposing internal database IDs in URLs.

## Requirements

### 1. Database Schema Changes

Add a `slug` column to the `courses` table:

```sql
ALTER TABLE courses
ADD COLUMN slug VARCHAR(255) UNIQUE NOT NULL;

-- Create index for faster slug lookups
CREATE UNIQUE INDEX idx_courses_slug ON courses(slug);

-- Add constraint to ensure slug is URL-friendly
ALTER TABLE courses
ADD CONSTRAINT chk_courses_slug_format
CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');
```

### 2. Slug Generation

Implement automatic slug generation when creating or updating courses:

**Example Slug Generation Logic:**
- Convert course title to lowercase
- Replace spaces with hyphens
- Remove special characters
- Ensure uniqueness by appending a number if needed

**Example:**
- Title: "Introduction to Web Development" → Slug: "introduction-to-web-development"
- If duplicate: "introduction-to-web-development-2"

**Suggested Implementation (Node.js/TypeScript):**

```javascript
function generateSlug(title, existingSlugs = []) {
  // Convert to lowercase and replace spaces with hyphens
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-');     // Replace multiple hyphens with single hyphen

  // Ensure uniqueness
  let finalSlug = slug;
  let counter = 1;

  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  return finalSlug;
}
```

### 3. API Endpoints

#### A. Create New Endpoint for Slug-Based Retrieval

```
GET /api/courses/slug/:slug
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "slug": "web-development-fundamentals",
    "title": "Web Development Fundamentals",
    "description": "Learn the basics of web development...",
    "mentor": "John Doe",
    "status": "active",
    "modules": [...],
    "resources": {...}
  }
}
```

#### B. Update Existing Endpoints

Ensure all course responses include the `slug` field:

```
GET /api/courses
GET /api/courses/:id
GET /api/directions/:directionId/courses
```

**Updated Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "python-basics",
      "title": "Python Basics",
      ...
    }
  ]
}
```

### 4. Backend Route Implementation

**Express.js Example:**

```javascript
// routes/courses.js

/**
 * Get course by slug
 * @route GET /api/courses/slug/:slug
 * @access Public/Private (based on your auth requirements)
 */
router.get('/slug/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({
      where: { slug },
      include: [
        { model: Module, as: 'modules' },
        { model: Resource, as: 'resources' },
        { model: User, as: 'mentor', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
});
```

### 5. Model Updates

**Sequelize Example:**

```javascript
// models/Course.js

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: 'A course with this slug already exists'
    },
    validate: {
      is: {
        args: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        msg: 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)'
      }
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // ... other fields
});

// Hook to generate slug before creation
Course.beforeCreate(async (course, options) => {
  if (!course.slug) {
    const existingSlugs = await Course.findAll({
      attributes: ['slug'],
      raw: true
    }).then(courses => courses.map(c => c.slug));

    course.slug = generateSlug(course.title, existingSlugs);
  }
});

// Hook to update slug when title changes
Course.beforeUpdate(async (course, options) => {
  if (course.changed('title') && !course.changed('slug')) {
    const existingSlugs = await Course.findAll({
      where: { id: { [Op.ne]: course.id } },
      attributes: ['slug'],
      raw: true
    }).then(courses => courses.map(c => c.slug));

    course.slug = generateSlug(course.title, existingSlugs);
  }
});
```

### 6. Migration for Existing Data

Create a migration to populate slugs for existing courses:

```javascript
// migrations/XXXXXX-add-slugs-to-existing-courses.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, add the column if it doesn't exist
    const tableDescription = await queryInterface.describeTable('courses');
    if (!tableDescription.slug) {
      await queryInterface.addColumn('courses', 'slug', {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true
      });
    }

    // Get all courses
    const courses = await queryInterface.sequelize.query(
      'SELECT id, title FROM courses WHERE slug IS NULL',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Generate and assign slugs
    const slugs = [];
    for (const course of courses) {
      let slug = generateSlug(course.title, slugs);
      slugs.push(slug);

      await queryInterface.sequelize.query(
        'UPDATE courses SET slug = :slug WHERE id = :id',
        {
          replacements: { slug, id: course.id },
          type: Sequelize.QueryTypes.UPDATE
        }
      );
    }

    // Make slug NOT NULL after populating
    await queryInterface.changeColumn('courses', 'slug', {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'slug');
  }
};

function generateSlug(title, existingSlugs = []) {
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');

  let finalSlug = slug;
  let counter = 1;

  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  return finalSlug;
}
```

### 7. Validation and Error Handling

Ensure proper error handling for:
- Invalid slug format
- Duplicate slugs
- Non-existent slugs (404)
- Slug length limits

**Example Validation:**

```javascript
// middleware/validators/courseValidator.js

const { body, param } = require('express-validator');

exports.validateSlug = [
  param('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must contain only lowercase letters, numbers, and hyphens')
    .isLength({ max: 255 })
    .withMessage('Slug must not exceed 255 characters')
];
```

### 8. Testing Checklist

- [ ] Test slug generation from course titles
- [ ] Test slug uniqueness constraint
- [ ] Test GET /api/courses/slug/:slug endpoint
- [ ] Test 404 response for non-existent slugs
- [ ] Test that existing endpoints still return slug field
- [ ] Test migration on development database
- [ ] Test URL-friendly slug validation
- [ ] Test slug updates when course title changes
- [ ] Performance test slug lookup queries

### 9. Documentation Updates

Update API documentation to include:
- New `/api/courses/slug/:slug` endpoint
- Slug field in course response schemas
- Slug format requirements
- Examples of valid/invalid slugs

## Security Benefits

1. **Obfuscation**: Prevents exposure of sequential database IDs
2. **SEO-Friendly**: Slugs are more readable and SEO-optimized
3. **User Experience**: URLs are more meaningful and memorable
4. **Enumeration Prevention**: Makes it harder to enumerate all courses

## Implementation Priority

1. **High Priority**: Add slug field to database and generate slugs for existing courses
2. **High Priority**: Implement GET /api/courses/slug/:slug endpoint
3. **Medium Priority**: Update all course response DTOs to include slug
4. **Low Priority**: Optimize slug generation algorithm if needed

## Notes

- Maintain backward compatibility by keeping ID-based endpoints working
- Consider implementing slug history/redirects if courses are renamed frequently
- Add monitoring for slug-related errors
- Document slug format in API documentation

## Questions to Address

1. Should old slugs redirect to new ones when a course title changes?
2. Do we need admin endpoints to manually set custom slugs?
3. Should we implement slug versioning for renamed courses?
4. What happens to old URLs when a slug changes?

---

**Contact Backend Team for questions or implementation support.**
