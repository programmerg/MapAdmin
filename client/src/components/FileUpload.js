import { LitElement, html, nothing } from 'lit';
import Resumable from 'resumablejs';

export class FileUpload extends LitElement {

  static properties = {
    state: {type: String},
    progress: {type: Number},
    action: {type: String},
    _files: {state: true},
    _uploadHandler: {state: false},
  }
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <input-component type="file" ?multiple=${this.multiple}>
        Drop video files here to upload or 
        <a id="browseButton"><u>select from your computer</u></a>
      </div>

      <div class="progress" style="display:none">
        <table class="table table-sm">
          <tr>
            <td></td>
            <td></td>
            <td style="width:100px">
              <div class="progress" role="progressbar" aria-valuenow="${(this.progress*100)}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="${'width: ' + (this.progress*100) + '%'}"></div>
              </div>
            </td>
            <td>
              <button type="button" class="btn btn-default btn-sm" style="${((this._uploadHandler.isUploading() || this.files.length < 1) ? 'display:none' : '')}" $click=${this._uploadHandler.upload()}>Start/Resume</button>
              <button type="button" class="btn btn-default btn-sm" style="${(!this._uploadHandler.isUploading() ? 'display:none' : '')}" $click=${this._uploadHandler.pause()}>Pause</button>
              <button type="button" class="btn btn-default btn-sm" style="${(!this._uploadHandler.isUploading() ? 'display:none' : '')}" $click=${this._uploadHandler.cancel()}>Stop</button>
            </td>
          </tr>
          ${this.renderFiles ? this.files.map(this.renderFile) : nothing}
        </table>
      </div>
    `;
  }

  renderFile(file) {
    return html`
      <tr>
        <td>${file.fileName}</td>
        <td>${file.size}</td>
        <td>
          ${file.isUploading() ? html`
          <div class="progress" role="progressbar" aria-valuenow="${(file.progress()*100)}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="${'width: ' + (file.progress()*100) + '%'}"></div>
          </div>
          ` : nothing}
        </td>
        <td>
          <button type="button" class="btn btn-default btn-sm" style="${((!file.isUploading() && !file.isComplete()) ? 'display:none' : '')}" $click=${file.retry()}>Retry</button>
          <button type="button" class="btn btn-default btn-sm" style="${((file.isUploading() && !file.isComplete()) ? 'display:none' : '')}" $click=${file.abort()}>Abort</button>
          <button type="button" class="btn btn-default btn-sm" style="${((file.isUploading() && !file.isComplete()) ? 'display:none' : '')}" $click=${file.cancel()}>Cancel</button>
        </td>
      </tr>
    `;
  }

  firstUpdated() {
    let target = '';
    const form = this.closest('form');
    if (form && form.action) target = form.action;
      
    const headers = {};
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) headers["Authorization"] = "Bearer " + jwtToken;

    const uploadHandler = new Resumable({
      target: target,
      chunkSize: 5*1024*1024,
      forceChunkSize: false,
      simultaneousUploads: 4,
      fileParameterName: 'file',
      chunkNumberParameterName: 'chunkNumber',
      totalChunksParameterName: 'totalChunks',
      chunkSizeParameterName: 'chunkSize',
      totalSizeParameterName: 'totalSize',
      identifierParameterName: 'identifier',
      fileNameParameterName: 'filename',
      relativePathParameterName: 'relativePath',
      currentChunkSizeParameterName: 'currentChunkSize',
      typeParameterName: 'type',
      query: {_token: csrfToken},
      uploadMethod: 'POST',
      headers: headers,
      method: 'multipart', // octet
      testChunks: false,
      maxFiles: undefined,
      maxFilesErrorCallback: (files, errorCount) => {},
      maxFileSize: 5*1024*1024*1204,
      maxFileSizeErrorCallback: (file, errorCount) => {},
      fileType: ["image/jpeg"], // any
      fileTypeErrorCallback: (file, errorCount) => {},
      maxChunkRetries: 3,
      withCredentials: false, // send cookies?
      setChunkTypeFromFile: false, // Set content-type from original file or application/octet-stream
    });

    uploadHandler.on('uploadStart', () => {
      this.state = 'UPLOADING';
    });
    uploadHandler.on('progress', () => {
      this.progress = uploadHandler.progress();
    });
    uploadHandler.on('pause', () => {
      this.state = 'PAUSED';
    });
    uploadHandler.on('cancel', () => {
      this.state = 'IDLE';
    });
    uploadHandler.on('complete', () => {
      this.state = 'COMPLETED';
    });
    uploadHandler.on('error', (msg, file) => {
      this.state = 'FAILED';
    });

    uploadHandler.on('fileAdded', (file, event) => {
      this._files = [...uploadHandler.files];
    });
    uploadHandler.on('fileProgress', (file, message) => {
      this._files = [...uploadHandler.files];
    });
    uploadHandler.on('fileRetry', (file) => {
      this._files = [...uploadHandler.files];
    });
    uploadHandler.on('fileSuccess', (file, message) => {
      this._files = [...uploadHandler.files];
    });
    uploadHandler.on('fileError', (file, message) => {
      this._files = [...uploadHandler.files];
    });

    uploadHandler.assignBrowse(this.getElementById('browseButton'));
    uploadHandler.assignDrop(this.getElementById('dropTarget'));

    this._uploadHandler = uploadHandler;
  }
}

customElements.define('fileupload-component', FileUpload);