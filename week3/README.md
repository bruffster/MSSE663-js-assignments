# Week 3 - Classes and Inheritance, Observables

## Included files

| File Name           | Description                                  |
| ------------------- | -------------------------------------------- |
| app.ts              | main app file where source code will live    |
| app.spec.ts         | main app test file where test code will live |
| observables.ts      | app file where test code will live           |
| observables.spec.ts | app test file where test code will live      |

### In `app.ts`:

1 Create an interface that has 3 properties and 2 methods.

- all properties should be typed.
- one method should return boolean.
- one method should return an array of items of a custom type.

2 Create a class that implements that interface.

3 Make a new instance of your class that calls your methods and outputs a result.

### In `observables.ts`:

1 Create an observable stream of an array (utilizing the `of` keyword).

2 Map over the values in the array.

3 Subscribe and ouput values to the concole.

### In `spec` files:

1 Describe what you want to test.

2 Write a test for 3 scenarios of your choice.

```javascript
// Tests are sutrctured in this pattern
describe('...', () => {
    it('...', () => {});
    ...
});
```

## Acceptance Criteria

- Your new isntance should output a result to the console for each method.
- Your tests should pass 3 scenarios.

## Requirements and Caveats

Use the following guidlines as reminders for your submissions.

- Use ES6 as the primary javascript target.
- All scripts should be linted before submission.
- All units of code should be tested and passing
