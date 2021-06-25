import { Trip, OktaUser, Settings, Catch } from './models.model';

describe('Model tests', () => {
  describe('Trip', () => {
    it('should create an instance', () => {
      expect(new Trip()).toBeTruthy();
    });
  });

  describe('OktaUser', () => {
    it('should create an instance', () => {
      expect(new OktaUser()).toBeTruthy();
    });
  });

  describe('Catch', () => {
    it('should create an instance', () => {
      expect(new Catch()).toBeTruthy();
    });
  });

  describe('Settings', () => {
    it('should create an instance', () => {
      expect(new Settings()).toBeTruthy();
    });
  });
});
