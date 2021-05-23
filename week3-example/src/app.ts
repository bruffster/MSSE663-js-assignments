export interface Person {
  name: Promise<string>;
  age: number;
}

export interface Bob extends Person {
  type: string;
  job: string;
  getName: () => Promise<string>;
  getAge: () => number;
}


export class Max implements Bob {
  name: Promise<string> = new Promise((resolve, reject) => 
    resolve('Max')
  );
  age: number;
  type: string;
  job: string;

  constructor(
    age: number,
    type: string, 
    job: string
    ) {
    this.age = age;
    this.type = type;
    this.job = job;
  }

  async getName(): Promise<string> {
     return await this.name;
  }

  getAge(): number {
    return this.age;
  }
}