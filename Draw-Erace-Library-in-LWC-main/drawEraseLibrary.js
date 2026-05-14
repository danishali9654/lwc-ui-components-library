import { LightningElement } from 'lwc';

export default class DrawEraseLibrary extends LightningElement {
  isDrawing = false;
  mode = 'draw'; // draw | erase | text
  color = '#000000';
  context;
  canvas;

  renderedCallback() {
    if (!this.context) {
      this.canvas = this.template.querySelector('canvas');
      this.context = this.canvas.getContext('2d');
      this.context.lineCap = 'round';
      this.context.lineWidth = 3;
      this.context.strokeStyle = this.color;
    }
  }

  setDrawMode() {
    this.mode = 'draw';
    this.context.strokeStyle = this.color;
  }

  setEraseMode() {
    this.mode = 'erase';
    this.context.strokeStyle = '#FFFFFF'; // Background color
  }

  setTextMode() {
    this.mode = 'text';
  }

  handleColorChange(event) {
    this.color = event.target.value;
    if (this.mode === 'draw') {
      this.context.strokeStyle = this.color;
    }
  }

  handleMouseDown(event) {
    const { x, y } = this.getMousePos(event);
    if (this.mode === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        this.context.fillStyle = this.color;
        this.context.font = '16px Arial';
        this.context.fillText(text, x, y);
      }
      return;
    }

    this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(x, y);
  }

  handleMouseMove(event) {
    if (!this.isDrawing || this.mode === 'text') return;
    const { x, y } = this.getMousePos(event);
    this.context.lineTo(x, y);
    this.context.stroke();
  }

  handleMouseUp() {
    this.isDrawing = false;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getMousePos(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}