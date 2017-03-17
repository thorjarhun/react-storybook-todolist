import { addItem, editItem, clearItem, toggleItem, toggleAll, clearCompleted } from '../actions';
import itemsReducer from './items';

const mockItem0 = {
  id: 0,
  completed: false,
  text: 'Sample 0'
};
const mockItem1 = {
  id: 1,
  completed: false,
  text: 'Sample 1'
};
const mockItem2 = {
  id: 2,
  completed: false,
  text: 'Sample 2'
};

const completeItem = item => ({
  ...item,
  completed: true
});

describe('items reducer', () => {
  it('should have initial state', () => {
    expect(
      itemsReducer(undefined, {})
    ).toEqual(
      []
    )
  });
  it('should handle addItem', () => {
    expect(
      itemsReducer([mockItem0], addItem('Sample 1'))
    ).toEqual(
      [mockItem0, mockItem1]
    );
    expect(
      itemsReducer([mockItem0, mockItem1], addItem('Sample 2'))
    ).toEqual(
      [mockItem0, mockItem1, mockItem2]
    );
    expect(
      itemsReducer([mockItem0, mockItem1, mockItem2], addItem('Sample 2'))
    ).toEqual(
      [mockItem0, mockItem1, mockItem2, {...mockItem2, id: 3}]
    );
  });
  it('should handle clearItem', () => {
    expect(
      itemsReducer([mockItem2, mockItem1], clearItem(1))
    ).toEqual(
      [mockItem2]
    );
    expect(
      itemsReducer([mockItem2, mockItem1], clearItem(2))
    ).toEqual(
      [mockItem1]
    );
    expect(
      itemsReducer([mockItem2, mockItem1], clearItem(3))
    ).toEqual(
      [mockItem2, mockItem1]
    );
  });
  it('should handle editItem', () => {
    expect(
      itemsReducer([mockItem2, mockItem1], editItem(1, 'foo'))
    ).toEqual(
      [mockItem2, {...mockItem1, text: 'foo'}]
    );
    expect(
      itemsReducer([mockItem2, mockItem1], editItem(2, 'bar'))
    ).toEqual(
      [{...mockItem2, text: 'bar'}, mockItem1]
    );
  });
  it('should handle toggleItem', () => {
    expect(
      itemsReducer([mockItem2, mockItem1], toggleItem(1))
    ).toEqual(
      [mockItem2, completeItem(mockItem1)]
    );
    expect(
      itemsReducer([mockItem2, mockItem1], toggleItem(2))
    ).toEqual(
      [completeItem(mockItem2), mockItem1]
    );
    expect(
      itemsReducer([mockItem2, mockItem1], toggleItem(3))
    ).toEqual(
      [mockItem2, mockItem1]
    );
    expect(
      itemsReducer([completeItem(mockItem2), mockItem1], toggleItem(3))
    ).toEqual(
      [completeItem(mockItem2), mockItem1]
    );
  });
  it('should handle toggleAll', () => {
    expect(
      itemsReducer([mockItem2, mockItem1], toggleAll())
    ).toEqual(
      [completeItem(mockItem2), completeItem(mockItem1)]
    );
    expect(
      itemsReducer([completeItem(mockItem2), mockItem1], toggleAll())
    ).toEqual(
      [completeItem(mockItem2), completeItem(mockItem1)]
    );
    expect(
      itemsReducer([completeItem(mockItem2), completeItem(mockItem1)], toggleAll())
    ).toEqual(
      [mockItem2, mockItem1]
    );
  });
  it('should handle clearCompleted', () => {
    expect(
      itemsReducer([completeItem(mockItem2), mockItem1], clearCompleted())
    ).toEqual(
      [mockItem1]
    );
    expect(
      itemsReducer([mockItem2, completeItem(mockItem1)], clearCompleted())
    ).toEqual(
      [mockItem2]
    );
    expect(
      itemsReducer([completeItem(mockItem2), completeItem(mockItem1)], clearCompleted())
    ).toEqual(
      []
    );
    expect(
      itemsReducer([mockItem2, mockItem1], clearCompleted())
    ).toEqual(
      [mockItem2, mockItem1]
    );
  })
});
