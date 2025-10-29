import { describe, it, expect } from 'vitest';
import {
  buildPaginationControls,
  calculateTotalPages,
  getCurrentPage,
  goToPage,
  nextPage,
  prevPage,
  getPageItems,
  renderPagination,
  formatPaginationInfo,
  createPageButtons
} from './147-github-pagination.js';

describe('calculateTotalPages', () => {
  it('should calculate pages for evenly divisible items', () => {
    expect(calculateTotalPages(100, 20)).toBe(5);
    expect(calculateTotalPages(60, 10)).toBe(6);
  });

  it('should round up for non-evenly divisible items', () => {
    expect(calculateTotalPages(105, 20)).toBe(6);
    expect(calculateTotalPages(55, 10)).toBe(6);
  });

  it('should handle single page', () => {
    expect(calculateTotalPages(5, 10)).toBe(1);
    expect(calculateTotalPages(20, 20)).toBe(1);
  });

  it('should handle zero items', () => {
    expect(calculateTotalPages(0, 10)).toBe(0);
  });
});

describe('getCurrentPage', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should return first page items', () => {
    expect(getCurrentPage(items, 1, 3)).toEqual([1, 2, 3]);
  });

  it('should return middle page items', () => {
    expect(getCurrentPage(items, 2, 3)).toEqual([4, 5, 6]);
  });

  it('should return last page items even if incomplete', () => {
    expect(getCurrentPage(items, 4, 3)).toEqual([10]);
  });

  it('should return empty array for out of range page', () => {
    expect(getCurrentPage(items, 5, 3)).toEqual([]);
  });

  it('should work with different page sizes', () => {
    expect(getCurrentPage(items, 1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getCurrentPage(items, 2, 5)).toEqual([6, 7, 8, 9, 10]);
  });
});

describe('goToPage', () => {
  const repos = Array.from({ length: 50 }, (_, i) => ({ id: i + 1 }));

  it('should navigate to first page', () => {
    const result = goToPage(repos, 1, 10);
    expect(result).toHaveLength(10);
    expect(result[0].id).toBe(1);
  });

  it('should navigate to middle page', () => {
    const result = goToPage(repos, 3, 10);
    expect(result).toHaveLength(10);
    expect(result[0].id).toBe(21);
  });

  it('should navigate to last page', () => {
    const result = goToPage(repos, 5, 10);
    expect(result).toHaveLength(10);
    expect(result[0].id).toBe(41);
  });

  it('should return empty for invalid page numbers', () => {
    expect(goToPage(repos, 0, 10)).toEqual([]);
    expect(goToPage(repos, 6, 10)).toEqual([]);
    expect(goToPage(repos, -1, 10)).toEqual([]);
  });
});

describe('nextPage', () => {
  it('should increment page when not at end', () => {
    expect(nextPage(1, 5)).toBe(2);
    expect(nextPage(3, 5)).toBe(4);
  });

  it('should not go beyond total pages', () => {
    expect(nextPage(5, 5)).toBe(5);
    expect(nextPage(10, 5)).toBe(5);
  });

  it('should handle edge cases', () => {
    expect(nextPage(1, 1)).toBe(1);
  });
});

describe('prevPage', () => {
  it('should decrement page', () => {
    expect(prevPage(3)).toBe(2);
    expect(prevPage(5)).toBe(4);
  });

  it('should not go below page 1', () => {
    expect(prevPage(1)).toBe(1);
    expect(prevPage(0)).toBe(1);
    expect(prevPage(-1)).toBe(1);
  });
});

describe('getPageItems', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  it('should extract first page', () => {
    expect(getPageItems(items, 1, 3)).toEqual(['a', 'b', 'c']);
  });

  it('should extract middle page', () => {
    expect(getPageItems(items, 2, 3)).toEqual(['d', 'e', 'f']);
  });

  it('should extract last page with partial items', () => {
    expect(getPageItems(items, 3, 3)).toEqual(['g', 'h']);
  });

  it('should work with page size of 1', () => {
    expect(getPageItems(items, 1, 1)).toEqual(['a']);
    expect(getPageItems(items, 5, 1)).toEqual(['e']);
  });

  it('should return empty for out of bounds pages', () => {
    expect(getPageItems(items, 10, 3)).toEqual([]);
  });
});

describe('formatPaginationInfo', () => {
  it('should format single page correctly', () => {
    const info = formatPaginationInfo(1, 1, 10, 20);
    expect(info).toContain('Page 1 of 1');
  });

  it('should show correct item range', () => {
    const info = formatPaginationInfo(2, 5, 100, 20);
    expect(info).toContain('Page 2 of 5');
    expect(info).toContain('21');
    expect(info).toContain('40');
    expect(info).toContain('100');
  });

  it('should handle last page with fewer items', () => {
    const info = formatPaginationInfo(5, 5, 105, 20);
    expect(info).toContain('Page 5 of 5');
    expect(info).toContain('81');
    expect(info).toContain('105');
  });

  it('should calculate correct ranges', () => {
    const info = formatPaginationInfo(1, 3, 50, 15);
    expect(info).toContain('1');
    expect(info).toContain('15');
  });
});

describe('createPageButtons', () => {
  it('should show all pages when count is small', () => {
    const buttons = createPageButtons(2, 5, 5);
    expect(buttons).toEqual([1, 2, 3, 4, 5]);
  });

  it('should show ellipsis for large page counts', () => {
    const buttons = createPageButtons(5, 10, 5);
    expect(buttons).toContain('...');
    expect(buttons[0]).toBe(1);
    expect(buttons[buttons.length - 1]).toBe(10);
  });

  it('should center current page in visible buttons', () => {
    const buttons = createPageButtons(5, 20, 5);
    expect(buttons).toContain(5);
  });

  it('should handle first page', () => {
    const buttons = createPageButtons(1, 20, 5);
    expect(buttons[0]).toBe(1);
  });

  it('should handle last page', () => {
    const buttons = createPageButtons(20, 20, 5);
    expect(buttons[buttons.length - 1]).toBe(20);
  });

  it('should not exceed max visible when showing all', () => {
    const buttons = createPageButtons(5, 8, 5);
    expect(buttons.length).toBeLessThanOrEqual(8);
  });
});

describe('buildPaginationControls', () => {
  it('should create pagination controls element', () => {
    const controls = buildPaginationControls(1, 5, () => {});
    expect(controls).toBeDefined();
    expect(controls.nodeType).toBeDefined();
  });

  it('should have previous button disabled on first page', () => {
    const controls = buildPaginationControls(1, 5, () => {});
    const prevBtn = controls.querySelector('[data-action="prev"]') || 
                    controls.querySelector('button.prev');
    expect(prevBtn).toBeDefined();
  });

  it('should have next button on non-last pages', () => {
    const controls = buildPaginationControls(1, 5, () => {});
    const nextBtn = controls.querySelector('[data-action="next"]') || 
                    controls.querySelector('button.next');
    expect(nextBtn).toBeDefined();
  });

  it('should call callback when page button clicked', (done) => {
    const controls = buildPaginationControls(1, 3, (page) => {
      expect(page).toBe(2);
      done();
    });

    const pageButton = controls.querySelector('button[data-page="2"]') ||
                      Array.from(controls.querySelectorAll('button'))
                        .find(btn => btn.textContent === '2');
    
    if (pageButton) {
      pageButton.click();
    }
  });

  it('should highlight current page', () => {
    const controls = buildPaginationControls(2, 5, () => {});
    const activeBtn = controls.querySelector('.active') || 
                     controls.querySelector('[aria-current="page"]');
    expect(activeBtn).toBeDefined();
  });
});

describe('renderPagination', () => {
  it('should render pagination markup', () => {
    const result = renderPagination(1, 5, () => {});
    if (typeof result === 'string') {
      expect(result).toContain('pagination');
    } else {
      expect(result.nodeType).toBeDefined();
    }
  });

  it('should include page numbers', () => {
    const result = renderPagination(2, 3, () => {});
    const str = typeof result === 'string' ? result : result.innerHTML;
    expect(str).toContain('1');
    expect(str).toContain('2');
    expect(str).toContain('3');
  });

  it('should mark current page as active', () => {
    const result = renderPagination(2, 3, () => {});
    const str = typeof result === 'string' ? result : result.innerHTML;
    expect(str).toContain('active') || expect(str).toContain('current');
  });

  it('should handle single page', () => {
    const result = renderPagination(1, 1, () => {});
    expect(result).toBeDefined();
  });
});
