# Exercise 159: Tags - Set Operations

Master advanced Set operations: union, intersection, difference, and bulk operations for managing tag collections.

## Core Concepts

### Set Operations

1. **Union** - Combine all tags from both sets
2. **Intersection** - Find common tags
3. **Difference** - Find tags unique to first set
4. **Superset** - Check if one set contains another

### Operations Reference

| Operation | Code | Result |
|-----------|------|--------|
| Union | `new Set([...set1, ...set2])` | All unique items |
| Intersection | `[...set1].filter(x => set2.has(x))` | Common items |
| Difference | `[...set1].filter(x => !set2.has(x))` | Only in first |

## 10 Functions

1. **combineTags(set1, set2)** - Union of two sets
2. **getCommonTags(set1, set2)** - Intersection
3. **getUniqueTags(set1, set2)** - Difference
4. **addMultipleTags(tags, array)** - Bulk add, return count added
5. **removeMultipleTags(tags, array)** - Bulk remove, return count removed
6. **hasAllTags(tags, array)** - Check all exist
7. **hasAnyTag(tags, array)** - Check any exist
8. **getAllExcept(tags, exclude)** - Get filtered array
9. **toggleTag(tags, tag)** - Add if missing, remove if exists
10. **isSupersetOf(tags, subset)** - Check superset relationship

## Test Coverage

- 45+ test cases covering all functions
- Integration tests for complex workflows
- Edge case handling
- Commutative and non-commutative operations

---

**Status:** Exercise structure ready for implementation
**Difficulty:** Intermediate
**Time:** 90-120 minutes
