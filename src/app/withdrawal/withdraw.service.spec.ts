import { TestBed } from '@angular/core/testing';

import { InvalidArgumentException, NoteUnavailableException, WithdrawService } from './withdraw.service';

describe('WithdrawService', () => {
  let service: WithdrawService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WithdrawService]
    });
    service = TestBed.get(WithdrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error when trying to get breakdown for negative value', () => {
    expect(() => service.getNotesBreakdown(-130)).toThrow(new InvalidArgumentException());
  });

  it('should throw error when trying to get breakdown for value not dividable by 10', () => {
    expect(() => service.getNotesBreakdown(135)).toThrow(new NoteUnavailableException());
  });

  it('should return of notes breakdown', () => {
    const result = service.getNotesBreakdown(160);
    const expected = [
      { note: 100, notesAmount: 1 },
      { note: 50, notesAmount: 1 },
      { note: 20, notesAmount: 0 },
      { note: 10, notesAmount: 1 },
    ];
    expect(result).toEqual(expected);
  });

  it('should not return note where amount is 0 and such option is provided', () => {
    const result = service.getNotesBreakdown(160, { skipEmptyNotes: true });
    const expected = [
      { note: 100, notesAmount: 1 },
      { note: 50, notesAmount: 1 },
      { note: 10, notesAmount: 1 },
    ];
    expect(result).toEqual(expected);
  });

  it('should return empty array when provided value is null, undefined or 0', () => {
    expect(service.getNotesBreakdown()).toEqual([]);
    expect(service.getNotesBreakdown(null)).toEqual([]);
    expect(service.getNotesBreakdown(0)).toEqual([]);
  });
});
