import { StringMap } from 'quill';

export const modules: StringMap = {
  toolbar: [
    [{ font: [] }],
    [{ size: ['small', 'medium', 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ background: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};
