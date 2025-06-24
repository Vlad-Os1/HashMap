class HashMap {
  constructor(size = 16) {
    this.buckets = Array.from({ length: size }, () => []);
    this.size = size;
    this.count = 0; // to track the load factor
  }

  _hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.size;
    }
    return hashCode;
  }
  set(key, value) {
    let index = this._hash(key);
    let bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return this.buckets;
      }
    }
    bucket.push([key, value]);
    this.count++;
    if (this.count / this.size >= 0.75) {
      this._resize();
    }
    return this.buckets;
  }

  get(key) {
    let index = this._hash(key);
    let bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  }

  has(key) {
    let index = this._hash(key);
    let bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair[0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let index = this._hash(key);
    let bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.count;
  }

  clear() {
    return (this.buckets = Array.from({ length: this.size }, () => []));
  }

  keys() {
    let arr = [];
    for (let bucket of this.buckets) {
      for (let [key] of bucket) {
        arr.push(key);
      }
    }
    return arr;
  }

  values() {
    let arr = [];
    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        arr.push(value);
      }
    }
    return arr;
  }

  entries() {
    let arr = [];
    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        arr.push([key, value]);
      }
    }
    return arr;
  }

  _resize() {
    console.log('i am pretty BIG NOW :)');
  }
}
