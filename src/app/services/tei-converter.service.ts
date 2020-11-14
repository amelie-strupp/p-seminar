import { TextData, Sentence, SubSentence, Word, PunctationMark } from './../classes/text-data';
import { Injectable } from '@angular/core';
/**
 * Uses Library Fast-XML-Parser
 */
import * as Parser from 'fast-xml-parser';

@Injectable({
  providedIn: 'root'
})
export class TeiConverterService {

  constructor() { }
  /**
   * Method that converts a TEI-XML-String to a TextData-Object
   */
  convertTeiToObject(xmlData: string): TextData {
    /**
     * Replace puctation mark tags with punction marks themselves, since they shouldn't be encoded.
     */
    const regExpForPunctationTags = new RegExp('<pc>(.*?)</pc>');
    let punctationMarkFound = regExpForPunctationTags.test(xmlData);
    while (punctationMarkFound){
      const index = regExpForPunctationTags.exec(xmlData).index;
      const match = regExpForPunctationTags.exec(xmlData)[0];
      const punctationMark = regExpForPunctationTags.exec(xmlData)[1];
      xmlData = xmlData.substring(
        0, index) + '<w pos="" notation="" isPunctationMark="true">' +punctationMark + '</w>' + xmlData.substring(index + match.length
      );
      punctationMarkFound = regExpForPunctationTags.test(xmlData);
    }

    /**
     * Options to configure how the XML-Object is being parsed to json
     * -> Convertion useful since JSON is a more "native" format for JS than XML
     * -> easier access
     */
    const options = {
      attributeNamePrefix : 'attr_',
      attrNodeName: 'attr',
      textNodeName : 'text',
      ignoreAttributes : false,
      parseNodeValue : true,
      parseAttributeValue : false,
      trimValues: true
    };

    const jsonData = Parser.parse(xmlData, options);
    const textData: TextData = new TextData();
    /**
     * Fill TextData with Values from JSON
     */

    // Extracting header data
    textData.author = jsonData.TEI.teiHeader.fileDesc.titleStmt.author;
    textData.title = jsonData.TEI.teiHeader.fileDesc.titleStmt.title;
    textData.sourceDesc = jsonData.TEI.teiHeader.fileDesc.sourceDesc.p;

    // Extracting sentences
    for (const sentenceObject of jsonData.TEI.text.div.s){
      textData.sentences.push(new Sentence());
      if (!Array.isArray(sentenceObject.cl)){
        sentenceObject.cl = [sentenceObject.cl];
      }
      // Extracting sub-sentences
      for (const subSentenceObject of sentenceObject.cl){
        if (subSentenceObject){
          const subSentence: SubSentence = new SubSentence();
          // Figure out which type of subsentence
          subSentence.type = subSentenceObject.attr.attr_type === 'hs' ? 'MAIN' : 'SUBORDINATE';
          // Since subordinate clauses can have different levels, they have to be extracted
          if (subSentence.type === 'SUBORDINATE') {
            const type = subSentenceObject.attr.attr_type.match(/\d+/);
            // If there is a number in the string
            if (type != null){
              const levelNumber = subSentenceObject.attr.attr_type.match(/\d+/)[0];
              // Convert the extracted string to a number
              subSentence.level = parseInt(levelNumber, 10);
            }
            // Indend once if it is a subordinate clause without any specification
            else{
              subSentence.level = 1;
            }
          }
          // Add subsentence to the last sentence
          textData.sentences[textData.sentences.length - 1].subSentences.push(subSentence);
          // Test if word is an array, since if there is only a single word it has been converted into an object
          if (Array.isArray(subSentenceObject.w)){
            for (const wordObject of subSentenceObject.w){
              // Add the word into the word-Array after filling in the properties
              const lastIndexOfSubsenteceArray = textData.sentences[textData.sentences.length - 1].subSentences.length - 1;
              if (wordObject.attr.attr_isPunctationMark){
                const punctationMark: PunctationMark = new PunctationMark();
                punctationMark.punctationMark = wordObject.text;
                textData.sentences[textData.sentences.length - 1].subSentences[lastIndexOfSubsenteceArray].words.push(punctationMark);
              }
              else{
                const word: Word = new Word();

                word.latinWord = wordObject.text;
                word.germanTranslation = wordObject.attr.attr_notation;
                word.grammaticalForm = wordObject.attr.attr_pos;

                textData.sentences[textData.sentences.length - 1].subSentences[lastIndexOfSubsenteceArray].words.push(word);
              }
            }
          }
          else{

            const wordObject = subSentenceObject.w;
            const lastIndexOfSubsenteceArray = textData.sentences[textData.sentences.length - 1].subSentences.length - 1;
            if (wordObject.attr.attr_isPunctationMark){
              const punctationMark: PunctationMark = new PunctationMark();
              punctationMark.punctationMark = wordObject.text;
              console.log(wordObject.attr.attr_isPunctationMark);
              textData.sentences[textData.sentences.length - 1].subSentences[lastIndexOfSubsenteceArray].words.push(punctationMark);
            }
            else{
              // Add the word into the word-Array after filling in the properties
              const word: Word = new Word();

              word.latinWord = wordObject.text;
              word.germanTranslation = wordObject.attr.attr_notation;
              word.grammaticalForm = wordObject.attr.attr_pos;

              textData.sentences[textData.sentences.length - 1].subSentences[lastIndexOfSubsenteceArray].words.push(word);
            }
          }
        }
      }
    }
    return textData;
  }
}
