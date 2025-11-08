import { StyleSheet, View, Text } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Todo Notes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function TodoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    todos,
    loading,
    error,
    refreshing,
    addTodo,
    updateTodoTitle,
    toggleTodoStatus,
    removeTodo,
    searchTodoItems,
    handleRefresh,
  } = useTodos();

  React.useEffect(() => {
    initDatabase();
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    searchTodoItems(text);
  }, [searchTodoItems]);

  const handleSubmit = useCallback(async (title: string) => {
    if (editTodo) {
      await updateTodoTitle(editTodo.id, title);
      setEditTodo(null);
    } else {
      await addTodo(title);
    }
  }, [editTodo, addTodo, updateTodoTitle]);

  const handleEdit = useCallback((todo: Todo) => {
    setEditTodo(todo);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setEditTodo(null);
  }, []);

  const renderItem = useCallback(({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggle={toggleTodoStatus}
      onDelete={removeTodo}
      onEdit={handleEdit}
    />
  ), [toggleTodoStatus, removeTodo, handleEdit]);

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Chưa có việc nào</Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search todos..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={EmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TodoModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editTodo={editTodo || undefined}
      />

      {loading && !refreshing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

