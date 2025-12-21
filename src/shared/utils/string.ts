String.prototype.fillZero = function (n: number): string {
  let zero = "";

  if (this.length < n) {
    for (let i = 0; i < n - this.length; i++) {
      zero += "0";
    }
  }

  return zero + this;
};

String.prototype.fillSpace = function (n: number): string {
  let space = "";

  if (this.length < n) {
    for (let i = 0; i < n - this.length; i++) {
      space += " ";
    }
  }

  return this + space;
};

String.prototype.byteLength = function (): number {
  let len = 0;

  for (let i = 0; i < this.length; i++) {
    len += this.charCodeAt(i) > 127 ? 2 : 1;
  }

  return len;
};

String.prototype.substrKor = function (idx: number, len: number): string {
  if (!this.valueOf()) return "";

  let str = String(this);
  let pos = 0;
  let beg = 0;

  for (let i = 0; pos < idx; i++) {
    pos += str.charCodeAt(i) > 127 ? 2 : 1;
    beg = i;
  }

  const byteLen = str.byteLength();
  let lim = 0;

  for (let i = beg; i < byteLen; i++) {
    lim += str.charCodeAt(i) > 127 ? 2 : 1;

    if (lim > len) {
      str = str.substring(beg, i);
      break;
    }
  }

  return str;
};

export function JSONtoString(object: Record<string, string>): string {
  const results: string[] = [];

  for (const property in object) {
    const value = object[property];
    if (value) results.push(property.toString() + ": " + value);
  }

  return "{" + results.join(", ") + "}";
}

export function FindJSONtoString(key: string, object: Record<string, string>): string {
  let results = "";

  for (const property in object) {
    const value = object[property];
    if (value) {
      if (key == property.toString()) {
        results = value;
        break;
      }
    }
  }

  return results;
}
