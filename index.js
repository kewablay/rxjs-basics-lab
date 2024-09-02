import { of, from, interval, take, concat, throwError, catchError } from "rxjs";

// Question 1: Creating and Subscribing to an Observable with of:
const numObservable = of(1, 2, 3, 4, 5);

numObservable.subscribe({
  next: (value) => console.log("Emitted value:", value),
  complete: () => console.log("Observable completed"),
});

// Question 2. Working with from
const programmingLanguages = [
  "JavaScript",
  "Python",
  "Java",
  "TypeScript",
  "C++",
];
const languagesObservable = from(programmingLanguages);
languagesObservable.subscribe({
  next: (language) => console.log(`Received language: ${language}`),
  error: (error) => console.error(error),
  complete: () => console.log("Observable completed"),
});

// Question 3: Using interval
const observable = interval(1000).pipe(take(5));

observable.subscribe({
  next: (value) =>
    console.log(
      `Emitted value: ${value}, Timestamp: ${new Date().toISOString()}`
    ),
  complete: () => console.log("Observable completed"),
});

// Question 4. Combining Observables
const numbersFromOf = of(1, 2, 3);
const numbersFromFrom = from([4, 5, 6]);
const combinedObservable = concat(numbersFromOf, numbersFromFrom);
combinedObservable.subscribe(
  (value) => console.log(`Received value: ${value}`),
  (error) => console.error(error),
  () => console.log("Observable completed")
);

// Question 5. Error Handling
const errorObservable = of(1, 2, 3, 4, 5).pipe(
  catchError((err) => {
    console.error("Ouch An error occurred:", err);
    return throwError(
      () => new Error("An error occured trying to get data from server")
    );
  })
);

errorObservable
  .pipe(
    catchError((error) => {
      if (error instanceof Error) {
        console.log("Error occured:", error.message);
      }
      return throwError(() => error);
    })
  )
  .subscribe({
    next: (value) => {
      if (value instanceof Error) {
        console.log("Error handled:", value.message);
      } else {
        console.log("Emitted value:", value);
      }
    },
    error: (error) => console.log("Error handled:", error.message),
    complete: () => console.log("Observable is complete"),
  });
