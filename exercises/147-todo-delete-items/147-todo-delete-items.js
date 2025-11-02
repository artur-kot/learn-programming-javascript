/**
 * Exercise 152: Todo Delete Items
 * Master deleting todos with undo/recovery and proper cleanup
 */

/**
 * TODO: Delete a specific todo by ID
 * Remove todo from array and return updated array
 * Use immutable patterns (don't modify original)
 * Return new array without the deleted todo
 * 
 * @param {Array} todos - Array of todo objects
 * @param {number} id - ID of todo to delete
 * @returns {Array} - Updated array without deleted todo
 */
export function deleteTodo(todos, id) {
  // TODO: Implement
}

/**
 * TODO: Remove todo by ID and return updated array
 * Similar to deleteTodo but with different semantics
 * Could be used for different deletion methods
 * Return new array
 * 
 * @param {Array} todos - Array of todos
 * @param {number} id - ID to remove
 * @returns {Array} - Updated array
 */
export function removeTodoById(todos, id) {
  // TODO: Implement
}

/**
 * TODO: Soft delete (move to trash)
 * Mark todo as deleted instead of removing
 * Keep in array but with deleted flag or separate trash
 * Allow recovery
 * Return updated state
 * 
 * @param {Array} todos - Array of todos
 * @param {number} id - ID to soft delete
 * @returns {Array|Object} - Updated state with trash
 */
export function softDeleteTodo(todos, id) {
  // TODO: Implement
}

/**
 * TODO: Restore deleted todo from trash
 * Move todo back from trash to active list
 * Remove deleted flag
 * Return updated state
 * 
 * @param {Array} todos - Active todos
 * @param {Array} trash - Deleted todos
 * @param {number} id - ID to restore
 * @returns {Object} - { todos: [], trash: [] }
 */
export function restoreDeletedTodo(todos, trash, id) {
  // TODO: Implement
}

/**
 * TODO: Empty trash permanently
 * Delete all todos in trash
 * Cannot be undone (except from history)
 * Clear trash array
 * Return updated state
 * 
 * @param {Array} trash - Array of deleted todos
 * @returns {Array} - Empty array
 */
export function emptyTrash(trash) {
  // TODO: Implement
}

/**
 * TODO: Get array of deleted todos
 * Return todos that are in trash
 * Separate from active todos
 * Allow viewing before permanent delete
 * 
 * @param {Array} trash - Trash array
 * @returns {Array} - Deleted todos
 */
export function getDeletedTodos(trash) {
  // TODO: Implement
}

/**
 * TODO: Undo last deletion
 * Restore most recently deleted todo
 * Requires tracking deletion history
 * Return updated todos
 * 
 * @param {Array} todos - Current todos
 * @param {Array} history - Deletion history
 * @returns {Object} - { todos: [], history: [] }
 */
export function undoLastDelete(todos, history) {
  // TODO: Implement
}

/**
 * TODO: Permanently delete a todo
 * Not soft delete - fully remove
 * Skip trash, go straight to deletion
 * Cannot be recovered
 * Return updated todos
 * 
 * @param {Array} todos - Array of todos
 * @param {number} id - ID to permanently delete
 * @returns {Array} - Updated todos
 */
export function permanentlyDeleteTodo(todos, id) {
  // TODO: Implement
}

/**
 * TODO: Delete multiple todos
 * Accept array of IDs to delete
 * Remove all matching todos
 * Return updated array
 * 
 * @param {Array} todos - Array of todos
 * @param {Array} ids - Array of IDs to delete
 * @returns {Array} - Updated todos
 */
export function deleteMultipleTodos(todos, ids) {
  // TODO: Implement
}

/**
 * TODO: Delete todos matching query/criteria
 * Support complex deletion criteria
 * Example: delete all completed todos
 * Example: delete todos older than date
 * Return updated array
 * 
 * @param {Array} todos - Array of todos
 * @param {Object} query - Query criteria
 * @returns {Array} - Updated todos
 */
export function deleteByQuery(todos, query) {
  // TODO: Implement
}
