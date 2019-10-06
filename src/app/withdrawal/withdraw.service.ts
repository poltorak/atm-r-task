import { Injectable } from '@angular/core';

const NOTES = [100, 50, 20, 10];

export class NoteUnavailableException extends Error {
  constructor(message?) {
    super(message);
    this.name = 'NoteUnavailableException';
  }
}
export class InvalidArgumentException extends Error {
  constructor(message?) {
    super(message);
    this.name = 'InvalidArgumentException';
  }
}

interface NotesBreakDownOptions {
  skipEmptyNotes?: boolean;
}

export interface NotesBreakdownResult {
  note: number;
  notesAmount: number;
}

@Injectable()
export class WithdrawService {

  public getNotesBreakdown(amount?: number, options: NotesBreakDownOptions = {}) {
    if (amount === 0 || amount === null || amount === undefined) {
      return [];
    }

    this.validateAmount(amount);

    return this.breakdownAmountToNotes(amount, options);
  }

  private breakdownAmountToNotes(amount, options): NotesBreakdownResult[] {
    const breakdown = NOTES.reduce((acc, next) => {
      const lastAccElement = acc.slice(-1)[0];
      const notesAmount = Math.floor(lastAccElement.amountLeft / next);
      const amountLeft = lastAccElement.amountLeft % next;
      return acc.concat({ note: next, notesAmount, amountLeft });
    }, [{ amountLeft: amount, note: null, notesAmount: 0 }])
    // skip initial value
    .slice(1)
    .map(el => ({ note: el.note, notesAmount: el.notesAmount }));

    if (options.skipEmptyNotes) {
      return breakdown.filter(element => element.notesAmount);
    }

    return breakdown;
  }

  private validateAmount(amount?: number) {
    if (amount < 0) {
      throw new InvalidArgumentException();
    }

    if (amount % 10 !== 0) {
      throw new NoteUnavailableException();
    }
  }

}
