import { LitElement, html } from 'lit';

export class Style extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form>      
        <div class="modal-header">
          <h1 class="modal-title fs-5">Create new style</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          https://mapserver.org/mapfile/class.html
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="class-name">NAME</label>
            <input type="text" class="form-control" name="name" id="class-name" value="">
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="class-expression">EXPRESSION</label>
            <input type="text" class="form-control" name="expression" id="class-expression" value="">
          </div>

          https://mapserver.org/mapfile/label.html
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="label-align">ALIGN</label>
            <select class="form-control" name="align" id="label-align">
              <option value=""></option>
              <option value="LEFT">LEFT</option>
              <option value="CENTER">CENTER</option>
              <option value="RIGHT">RIGHT</option>
            </select>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="label-position">POSITION</label>
            <select class="form-control" name="position" id="label-position">
              <option value=""></option>
              <option value="AUTO">AUTO</option>
              <option value="UL">Upper Left</option>
              <option value="UC">Upper Center</option>
              <option value="UR">Upper Right</option>
              <option value="CL">Center Left</option>
              <option value="CC">Center Center</option>
              <option value="CR">Center Right</option>
              <option value="LL">Lower Left</option>
              <option value="LC">Lower Center</option>
              <option value="LR">Lower Right</option>
            </select>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">COLOR</label>
            <div class="input-group">
              <input type="number" min="0" max="255" class="form-control text-right" name="color-r" placeholder="red" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="color-g" placeholder="green" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="color-b" placeholder="blue" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">OUTLINECOLOR</label>
            <div class="input-group">
              <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-r" placeholder="red" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-g" placeholder="green" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-b" placeholder="blue" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">MINSCALEDENOM</label>
            <input type="text" class="form-control text-right" name="minscaledenom" value="">
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">MAXSCALEDENOM</label>
            <input type="text" class="form-control text-right" name="maxscaledenom" value="">
          </div>


          https://mapserver.org/mapfile/style.html
          <div class="row">
            <div class="col-6">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label col-form-label-sm">COLOR</label>
                <div class="input-group">
                  <input type="number" min="0" max="255" class="form-control text-right" name="style-color-r" placeholder="red" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="style-color-g" placeholder="green" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="style-color-b" placeholder="blue" value="">
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm">OUTLINECOLOR</label>
                <div class="input-group">
                  <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-r" placeholder="red" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-g" placeholder="green" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-b" placeholder="blue" value="">
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-width">WIDTH</label>
                <input type="text" class="form-control" name="width" id="style-width" value="">
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-symbol">SYMBOL</label>
                <input type="text" class="form-control" name="symbol" id="style-symbol" value="">
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-size">SIZE</label>
                <input type="text" class="form-control" name="size" id="style-size" value="">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-minscaledenom">MINSCALEDENOM</label>
                <input type="text" class="form-control text-right" name="minscaledenom" id="style-minscaledenom" value="">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-maxscaledenom">MAXSCALEDENOM</label>
                <input type="text" class="form-control text-right" name="maxscaledenom" id="style-maxscaledenom" value="">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    `;
  }
}

customElements.define('style-modal', Style);