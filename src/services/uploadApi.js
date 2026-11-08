import { api } from './api';

export const uploadApi = {
  /**
   * Upload prescription document (DOCX, PDF, JPG, PNG)
   * @param {File} file
   * @returns {Promise<{success: boolean, data?: { fileId: string, fileName: string, fileUrl: string, fileType: string, fileSize: number }, message?: string}>}
   */
  uploadPrescription: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/upload/prescription', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res;
    } catch (error) {
      console.error('[UploadApi] Prescription upload error:', error);
      return {
        success: false,
        message: error.message || 'Failed to upload prescription document to optical server',
      };
    }
  },
};

export default uploadApi;

