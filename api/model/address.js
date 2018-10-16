// @flow

export class Address {
  number: number;
  street: string;
  zip: number;
  city: string;

  constructor(number: number, street: string, zip: number, city: string) {
    this.number = number;
    this.street = street;
    this.zip = zip;
    this.city = city;
  }
}
