import { ref, computed } from 'vue';

/**
 * Composable for handling file uploads with drag & drop support
 */
export function useFileUpload(options = {}) {
  const {
    maxSize = 50 * 1024 * 1024, // 50MB default
    allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg'
    ],
    multiple = true,
    onUpload = null,
    onError = null
  } = options;

  const files = ref([]);
  const isDragging = ref(false);
  const isUploading = ref(false);
  const uploadProgress = ref(0);
  const error = ref(null);

  const allowedExtensions = computed(() => {
    const extensionMap = {
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
      'application/vnd.ms-excel': '.xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
      'image/jpeg': '.jpg, .jpeg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'video/mp4': '.mp4',
      'video/webm': '.webm',
      'audio/mpeg': '.mp3',
      'audio/wav': '.wav',
      'audio/ogg': '.ogg'
    };
    return allowedTypes.map(type => extensionMap[type] || type).join(', ');
  });

  const maxSizeFormatted = computed(() => {
    if (maxSize >= 1024 * 1024) {
      return `${(maxSize / (1024 * 1024)).toFixed(0)} MB`;
    }
    return `${(maxSize / 1024).toFixed(0)} KB`;
  });

  /**
   * Validate a single file
   */
  const validateFile = (file) => {
    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `Fayl hajmi ${maxSizeFormatted.value} dan oshmasligi kerak`
      };
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Fayl turi qo'llab-quvvatlanmaydi. Ruxsat berilgan: ${allowedExtensions.value}`
      };
    }

    return { valid: true, error: null };
  };

  /**
   * Process selected files
   */
  const processFiles = (fileList) => {
    error.value = null;
    const newFiles = [];
    const errors = [];

    for (const file of fileList) {
      const validation = validateFile(file);
      if (validation.valid) {
        newFiles.push({
          file,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          progress: 0,
          status: 'pending' // pending, uploading, success, error
        });
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    }

    if (errors.length > 0) {
      error.value = errors.join('\n');
      if (onError) onError(errors);
    }

    if (multiple) {
      files.value = [...files.value, ...newFiles];
    } else {
      files.value = newFiles.slice(0, 1);
    }

    return newFiles;
  };

  /**
   * Handle file input change
   */
  const handleFileSelect = (event) => {
    const fileList = event.target.files;
    if (fileList) {
      processFiles(Array.from(fileList));
    }
  };

  /**
   * Handle drag events
   */
  const handleDragEnter = (event) => {
    event.preventDefault();
    isDragging.value = true;
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    isDragging.value = false;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    isDragging.value = false;

    const fileList = event.dataTransfer?.files;
    if (fileList) {
      processFiles(Array.from(fileList));
    }
  };

  /**
   * Remove a file from the list
   */
  const removeFile = (fileId) => {
    const file = files.value.find(f => f.id === fileId);
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    files.value = files.value.filter(f => f.id !== fileId);
  };

  /**
   * Clear all files
   */
  const clearFiles = () => {
    files.value.forEach(f => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    files.value = [];
    error.value = null;
  };

  /**
   * Upload files using provided upload function
   */
  const uploadFiles = async (uploadFn) => {
    if (files.value.length === 0) return;

    isUploading.value = true;
    uploadProgress.value = 0;

    try {
      const results = [];
      for (let i = 0; i < files.value.length; i++) {
        const fileItem = files.value[i];
        fileItem.status = 'uploading';

        try {
          const result = await uploadFn(fileItem.file, (progress) => {
            fileItem.progress = progress;
            uploadProgress.value = Math.round(
              ((i + progress / 100) / files.value.length) * 100
            );
          });
          fileItem.status = 'success';
          results.push({ success: true, file: fileItem, result });
        } catch (err) {
          fileItem.status = 'error';
          results.push({ success: false, file: fileItem, error: err });
        }
      }

      if (onUpload) onUpload(results);
      return results;
    } finally {
      isUploading.value = false;
    }
  };

  /**
   * Format file size for display
   */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  /**
   * Get file icon based on type
   */
  const getFileIcon = (mimeType) => {
    if (mimeType?.startsWith('image/')) return 'image';
    if (mimeType?.startsWith('video/')) return 'video';
    if (mimeType?.startsWith('audio/')) return 'audio';
    if (mimeType?.includes('pdf')) return 'pdf';
    if (mimeType?.includes('word') || mimeType?.includes('document')) return 'word';
    if (mimeType?.includes('excel') || mimeType?.includes('spreadsheet')) return 'excel';
    return 'file';
  };

  return {
    // State
    files,
    isDragging,
    isUploading,
    uploadProgress,
    error,

    // Computed
    allowedExtensions,
    maxSizeFormatted,

    // Methods
    handleFileSelect,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    removeFile,
    clearFiles,
    uploadFiles,
    validateFile,
    formatFileSize,
    getFileIcon
  };
}
