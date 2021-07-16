import { TestBed, async } from '@angular/core/testing';
import { DateTimeFormat } from './DateTimeFormat.pipe';
 
describe('Pipe: DateTimeFormatPipe', () => {
  it('create an instance', () => {
    let pipe = new DateTimeFormat('');
    expect(pipe).toBeTruthy();
  });
});