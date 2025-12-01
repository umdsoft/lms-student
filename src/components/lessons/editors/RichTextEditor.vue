<template>
  <div class="rich-text-editor">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2 rounded-t-lg">
      <!-- Text formatting -->
      <div class="flex items-center gap-1 pr-2 border-r border-gray-300">
        <button
          type="button"
          class="toolbar-btn"
          :class="{ 'is-active': editor?.isActive('bold') }"
          @click="editor?.chain().focus().toggleBold().run()"
          :title="t('lessons.editor.bold')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/>
          </svg>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ 'is-active': editor?.isActive('italic') }"
          @click="editor?.chain().focus().toggleItalic().run()"
          :title="t('lessons.editor.italic')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4h4m-2 0l-4 16m4-16l-4 16m-2 0h4"/>
          </svg>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ 'is-active': editor?.isActive('underline') }"
          @click="editor?.chain().focus().toggleUnderline().run()"
          :title="t('lessons.editor.underline')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8v4a5 5 0 0010 0V8M5 20h14"/>
          </svg>
        </button>
      </div>

      <!-- Lists -->
      <div class="flex items-center gap-1 px-2 border-r border-gray-300">
        <button
          type="button"
          class="toolbar-btn"
          :class="{ 'is-active': editor?.isActive('bulletList') }"
          @click="editor?.chain().focus().toggleBulletList().run()"
          :title="t('lessons.editor.bulletList')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ 'is-active': editor?.isActive('orderedList') }"
          @click="editor?.chain().focus().toggleOrderedList().run()"
          :title="t('lessons.editor.orderedList')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20h14M7 12h14M7 4h14M3 20h.01M3 12h.01M3 4h.01"/>
          </svg>
        </button>
      </div>

      <!-- Special features -->
      <div class="flex items-center gap-1 pl-2">
        <button
          v-if="showMathButton"
          type="button"
          class="toolbar-btn"
          @click="$emit('openMath')"
          :title="t('lessons.editor.formula')"
        >
          <span class="font-serif text-sm font-bold">∑</span>
        </button>
        <button
          v-if="showImageButton"
          type="button"
          class="toolbar-btn"
          @click="$emit('openImage')"
          :title="t('lessons.editor.image')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Editor content -->
    <EditorContent
      :editor="editor"
      class="editor-content prose prose-sm max-w-none p-4 min-h-[150px] focus:outline-none border border-t-0 border-gray-200 rounded-b-lg"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  showMathButton: {
    type: Boolean,
    default: true
  },
  showImageButton: {
    type: Boolean,
    default: true
  },
  minHeight: {
    type: String,
    default: '150px'
  }
});

const emit = defineEmits(['update:modelValue', 'openMath', 'openImage']);

const { t } = useI18n();

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Image.configure({
      inline: true,
      allowBase64: true
    }),
    Placeholder.configure({
      placeholder: props.placeholder || t('lessons.editor.placeholder')
    })
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  }
});

// Watch for external value changes
watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue, false);
  }
});

// Method to insert image
const insertImage = (url) => {
  if (editor.value && url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
};

// Method to insert HTML (for math formulas)
const insertHtml = (html) => {
  if (editor.value && html) {
    editor.value.chain().focus().insertContent(html).run();
  }
};

// Expose methods to parent
defineExpose({
  insertImage,
  insertHtml,
  editor
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style scoped>
.toolbar-btn {
  @apply p-2 rounded hover:bg-gray-200 transition-colors text-gray-600;
}

.toolbar-btn.is-active {
  @apply bg-blue-100 text-blue-600;
}

.editor-content :deep(.ProseMirror) {
  @apply outline-none;
  min-height: v-bind(minHeight);
}

.editor-content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  @apply text-gray-400 float-left h-0 pointer-events-none;
  content: attr(data-placeholder);
}

.editor-content :deep(.ProseMirror img) {
  @apply max-w-full h-auto rounded;
}

.editor-content :deep(.ProseMirror ul) {
  @apply list-disc ml-4;
}

.editor-content :deep(.ProseMirror ol) {
  @apply list-decimal ml-4;
}
</style>
