import React, { useState } from "react";
import { Editor, EditorState, convertToRaw, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";

const TextEditor = () => {

  const initialText = { "blocks": [{ "key": "ar3ou", "text": "Oyun Hakkında:\n\n “Kendini boşuna harcamış olur insan,\nDilediğine erer de sevinç duymazsa.\nYıktığın hayat kendininki olsun daha iyi,\nYıkmakla kazandığın şey kuşkulu bir mutluluksa.”\nW. Shakespeare\n\nOyun, insanımsı diye adlandırılan canlıların yaşadığı ütopik bir yaşam düzenini konu ediniyor. Bu düzen içerisinde yaşayan baş karakter Loki, komününde gerçekleşen bir istila sonucunda güce ulaşma sürecini ve ardından güç tutkusunun onda nasıl bir dönüşüm yarattığını tartışıyor.\n\nGüç nedir? Bir tahakküm mü yoksa bir özgürlük mü? sorularını merkezine yerleştiren Otofaji insanoğlunun varoluşundan bu yana evrensel bir zaafı olan güç tutkusunu yaşadığımız dünyada sevgi ve barışa değil, totoliterizme dayalı bir anlayışın oluşturduğuna vurgu yapıyor.\n\nAbout Play:\n\nThe play is about a utopian life order inhabited by creatures called humanoids. The main character, Loki, who lives in this order, discusses the process of reaching power as a result of an invasion in his commune, and then how his passion for power transformed him.\n\nWhat is power? A domination or a freedom? Focusing on the questions of Autophagy, it emphasizes that the passion for power, which has been a universal weakness of human beings since its existence, is based on an understanding based on totalitarianism, not love and peace in the world we live in.\n\nOyun Türü: Postdramatik\nOyun Süresi: 45 dk\n\nYazan Yöneten Oynayan: Tolga Avcu\nYönetmen Yardımcısı: Duygu Yakasız\nHareket Düzeni: Yağmur Bilgin\nReji Asistanları: Yalgın Ballıkaya, Melis Lara Seçkin\nIşık Tasarım: Furkan Kaymaz\nAfiş - Dekor Tasarım: Gül Yavuz\nDijital İçerik: Cihan Cem Demirsoy\nKostüm Tasarım : Selma Özelma Şahin\nSes Tasarım:Sinan Can Sarı Yapım: Poros Art Tiyatro", "type": "unstyled", "depth": 0, "inlineStyleRanges": [{ "offset": 202, "length": 16, "style": "BOLD" }], "entityRanges": [], "data": {} }, { "key": "8l2nd", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const initialContent = 'Bu bir başlangıç metnidir.';
  const contentState = ContentState.createFromText(initialContent);
  const initialEditorState = EditorState.createWithContent(contentState);



  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }
  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    // Metnin işlenebilecek şekilde doğru formatta olduğundan emin olun
    const contentRaw = JSON.stringify(convertToRaw(contentState));
  };


  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text", width: "50%" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={handleChange}
        // placeholder="Write something!"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
}

export default TextEditor;