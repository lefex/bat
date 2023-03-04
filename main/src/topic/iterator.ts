/**
 * 迭代器
 */

export function runIterator() {
  class MyIterator<T> implements Iterator<T> {
    private currentIndex: number = 0;
    private items: T[];

    constructor(items: T[]) {
      this.items = items;
    }

    public next(): IteratorResult<T> {
      if (this.currentIndex < this.items.length) {
        let ret = {
          value: this.items[this.currentIndex]
        }
        this.currentIndex += 1;
        return ret;
      }
      return {
        done: true,
        value: null
      }
    }
  }

  const myIterable = [1, 2, 3, 4, 5];
  const myIterator = new MyIterator(myIterable);
  
  for (const item of myIterator) {
      console.log(item);
  }
}