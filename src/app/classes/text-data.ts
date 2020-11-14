export class TextData {
  /**
   * Author of the XML-File
   */
  author: string;
  /**
   * Title of the text
   */
  title: string;
  /**
   * Reference to the section
   */
  sourceDesc: string;
  /**
   * Array containing the sentences of the text
   */
  sentences: Array<Sentence> = [];
}

export class Sentence{
  /**
   * A sentence consists out of multiple sub-sentences
   */
  subSentences: Array<SubSentence> = [];
}

export class SubSentence{
  /**
   * A sentence consists out of multiple word-objects
   */
  words: Array<any> = [];
  /**
   * Wether the sentence is a main clause or
   * ad subordinate clause
   */
  type: 'MAIN' | 'SUBORDINATE';
  /**
   * Subordinate clauses can have different levels, that need to be saved
   */
  level?: number;
  /**
   * Returns how deeply the sentence should be indented
   */
  getIndentationDepth(): number{
    if (this.type === 'MAIN') { return 0; }
    else                      { return this.level; }
  }
}

export class Word{
  latinWord: string;
  germanTranslation: string;
  grammaticalForm: string;
}
export class PunctationMark{
  punctationMark: string;
}
