import { forwardRef, Ref } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './html-text.scss';

type HtmlTextProps = {
  width: number;
  height: number;
  html: ReactQuill.Value;
};

const HtmlText = forwardRef(({ html, width, height }: HtmlTextProps, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      className="custom-quill__wrapper"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <ReactQuill className="custom-quill" value={html} theme="snow" modules={{ toolbar: false }} />
    </div>
  );
});

export default HtmlText;
