import { Component, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';

// declare var SignaturePad: any;

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements AfterViewInit {
  signaturePad: SignaturePad | undefined; 
  undoData: any[] = []; // Array to store removed data for undo
  redoData: any[] = []; // Array to store data for redo

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = document.getElementById('signature-pad') as HTMLCanvasElement;
    const signaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgb(255, 255, 255)'
    });
    this.signaturePad = signaturePad;
  }

  downloadAsPng(){
    if (this.signaturePad?.isEmpty()) {
      return alert('Please provide a signature first.');
    }
    const data =this.signaturePad?.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data!;
    link.download = 'signature.png';
    link.click();
  }
  downloadAsJpeg() {
    if (this.signaturePad?.isEmpty()) {
      return alert('Please provide a signature first.');
    }
    const data = this.signaturePad?.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data!;
    link.download = 'signature.jpeg';
    link.click();
  }
  downloadAsSvg() {
    if (this.signaturePad?.isEmpty()) {
      return alert('Please provide a signature first.');
    }
    const data = this.signaturePad?.toDataURL('image/svg+xml');
    const link = document.createElement('a');
    link.href = data!;
    link.download = 'signature.svg';
    link.click();
  }

  clear(){
    this.signaturePad?.clear();
  }
  erase(){
    this.signaturePad?.compositeOperation == 'destination-out';
  }
  undo(){
    let data = this.signaturePad?.toData();
    if(data){
    const removedData =   data.pop();
    this.redoData.push(removedData);
      this.signaturePad?.fromData(data)
    }
  }
  redo() {
    if (this.redoData.length > 0) {
      const redoItem = this.redoData.pop();
      const data = this.signaturePad?.toData();
      if (redoItem && data) {
        data.push(redoItem);
        this.signaturePad?.fromData(data);
      }
    }
  }
}
