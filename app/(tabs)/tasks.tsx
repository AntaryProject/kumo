import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/auth';
import { useTasksStore } from '../../store/tasks';
import { Task } from '../../types';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, PRIORITY_OPTIONS } from '../../constants';
import { Card, CardContent } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading, { ErrorMessage, EmptyState } from '../../components/Loading';

export default function TasksScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const { user } = useAuthStore();
  const { tasks, loading, error, loadTasks, addTask, updateTask, deleteTask, toggleTask } = useTasksStore();

  useEffect(() => {
    if (user) {
      loadTasks(user.id);
    }
  }, [user, loadTasks]);

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !user) return;

    await addTask({
      user_id: user.id,
      title: newTask.title.trim(),
      description: newTask.description.trim() || null,
      priority: newTask.priority,
      completed: false,
      due_date: null,
    });

    setNewTask({ title: '', description: '', priority: 'medium' });
    setShowAddModal(false);
  };

  const handleEditTask = async () => {
    if (!editingTask || !newTask.title.trim()) return;

    await updateTask(editingTask.id, {
      title: newTask.title.trim(),
      description: newTask.description.trim() || null,
      priority: newTask.priority,
    });

    setEditingTask(null);
    setNewTask({ title: '', description: '', priority: 'medium' });
  };

  const handleDeleteTask = (task: Task) => {
    Alert.alert(
      'Eliminar tarea',
      `¿Estás seguro de que quieres eliminar "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteTask(task.id) },
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    const option = PRIORITY_OPTIONS.find(p => p.value === priority);
    return option?.color || COLORS.textSecondary;
  };

  const renderTask = ({ item }: { item: Task }) => (
    <Card style={styles.taskCard}>
      <CardContent>
        <View style={styles.taskHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => toggleTask(item.id)}
          >
            <Ionicons
              name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.completed ? COLORS.success : COLORS.textSecondary}
            />
          </TouchableOpacity>
          
          <View style={styles.taskContent}>
            <Text style={[
              styles.taskTitle,
              item.completed && styles.completedTask
            ]}>
              {item.title}
            </Text>
            
            {item.description && (
              <Text style={styles.taskDescription}>{item.description}</Text>
            )}
            
            <View style={styles.taskFooter}>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(item.priority) + '20' }
              ]}>
                <Text style={[
                  styles.priorityText,
                  { color: getPriorityColor(item.priority) }
                ]}>
                  {PRIORITY_OPTIONS.find(p => p.value === item.priority)?.label}
                </Text>
              </View>
              
              {item.due_date && (
                <Text style={styles.dueDate}>
                  {new Date(item.due_date).toLocaleDateString('es-ES')}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.taskActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                setEditingTask(item);
                setNewTask({
                  title: item.title,
                  description: item.description || '',
                  priority: item.priority,
                });
              }}
            >
              <Ionicons name="pencil" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteTask(item)}
            >
              <Ionicons name="trash" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </CardContent>
    </Card>
  );

  if (loading && tasks.length === 0) {
    return <Loading text="Cargando tareas..." />;
  }

  if (error && tasks.length === 0) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => user && loadTasks(user.id)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Tareas</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <EmptyState
          title="No hay tareas"
          subtitle="Agrega tu primera tarea para comenzar a organizarte"
          icon="📝"
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.tasksList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add Task Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nueva Tarea</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Input
              label="Título"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
              placeholder="Título de la tarea"
            />

            <Input
              label="Descripción"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
              placeholder="Descripción (opcional)"
              multiline
              numberOfLines={3}
            />

            <View style={styles.priorityContainer}>
              <Text style={styles.priorityLabel}>Prioridad</Text>
              <View style={styles.priorityOptions}>
                {PRIORITY_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.priorityOption,
                      newTask.priority === option.value && styles.priorityOptionSelected,
                      { borderColor: option.color }
                    ]}
                    onPress={() => setNewTask({ ...newTask, priority: option.value as any })}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      { color: option.color }
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              title="Agregar Tarea"
              onPress={handleAddTask}
              disabled={!newTask.title.trim()}
            />
          </View>
        </View>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        visible={!!editingTask}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Tarea</Text>
            <TouchableOpacity onPress={() => setEditingTask(null)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Input
              label="Título"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
              placeholder="Título de la tarea"
            />

            <Input
              label="Descripción"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
              placeholder="Descripción (opcional)"
              multiline
              numberOfLines={3}
            />

            <View style={styles.priorityContainer}>
              <Text style={styles.priorityLabel}>Prioridad</Text>
              <View style={styles.priorityOptions}>
                {PRIORITY_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.priorityOption,
                      newTask.priority === option.value && styles.priorityOptionSelected,
                      { borderColor: option.color }
                    ]}
                    onPress={() => setNewTask({ ...newTask, priority: option.value as any })}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      { color: option.color }
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              title="Guardar Cambios"
              onPress={handleEditTask}
              disabled={!newTask.title.trim()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksList: {
    padding: SPACING.md,
  },
  taskCard: {
    marginBottom: SPACING.md,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: SPACING.md,
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  taskDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  priorityText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  dueDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  taskActions: {
    flexDirection: 'row',
    marginLeft: SPACING.sm,
  },
  actionButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalContent: {
    flex: 1,
    padding: SPACING.md,
  },
  priorityContainer: {
    marginBottom: SPACING.lg,
  },
  priorityLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    padding: SPACING.sm,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  priorityOptionSelected: {
    backgroundColor: COLORS.surface,
  },
  priorityOptionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
