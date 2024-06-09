import dictionary from '@/core/dictionary/words_v1.json';

export class Dictionary {
  dict: string[];

  constructor() {
    this.dict = dictionary.data.map((word) => word.text);
  }

  getRandomWord() {
    if (this.dict.length === 0) {
      return null;
    }
    return this.dict[Math.floor(Math.random() * this.dict.length)];
  }

  isWordValid(word: string) {
    return this.dict.includes(word);
  }

  isLinkingWordPair(first_word: string, second_word: string) {
    const endFirst = first_word.split(' ')[1];
    const startSecond = second_word.split(' ')[0];
    return (
      this.isWordValid(first_word) &&
      this.isWordValid(second_word) &&
      endFirst === startSecond
    );
  }
}
