import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/auth';
import { useMoodsStore } from '../../store/moods';
import { MOOD_OPTIONS } from '../../constants';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { Card, CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';

export default function ProfileScreen() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
  });
  const [moodNote, setMoodNote] = useState('');

  const { user, signOut, updateProfile, loading } = useAuthStore();
  const { moods, addMood, getTodayMood, loadMoods } = useMoodsStore();

  React.useEffect(() => {
    if (user) {
      setEditForm({
        full_name: user.full_name || '',
        email: user.email,
      });
      loadMoods(user.id);
    }
  }, [user, loadMoods]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    const result = await updateProfile({
      full_name: editForm.full_name.trim() || null,
    });

    if (result.success) {
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      setShowEditModal(false);
    } else {
      Alert.alert('Error', result.error || 'Error al actualizar el perfil');
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const handleMoodSelect = async (mood: string) => {
    if (!user) return;

    await addMood({
      user_id: user.id,
      mood: mood as any,
      note: moodNote.trim() || null,
    });

    setMoodNote('');
    setShowMoodModal(false);
    Alert.alert('¡Gracias!', 'Tu estado de ánimo ha sido registrado');
  };

  const todayMood = user ? getTodayMood(user.id) : null;

  if (loading) {
    return <Loading text="Cargando perfil..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color={COLORS.white} />
        </View>
        <Text style={styles.userName}>{user.full_name || 'Usuario'}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.content}>
        {/* Today's Mood */}
        <Card style={styles.card}>
          <CardHeader
            title="Estado de Ánimo de Hoy"
            subtitle={todayMood ? 'Ya registraste tu estado de ánimo' : '¿Cómo te sientes hoy?'}
          />
          <CardContent>
            {todayMood ? (
              <View style={styles.moodDisplay}>
                <Text style={styles.moodEmoji}>
                  {MOOD_OPTIONS.find(m => m.value === todayMood.mood)?.emoji}
                </Text>
                <Text style={styles.moodText}>
                  {MOOD_OPTIONS.find(m => m.value === todayMood.mood)?.label}
                </Text>
                {todayMood.note && (
                  <Text style={styles.moodNote}>{todayMood.note}</Text>
                )}
              </View>
            ) : (
              <Button
                title="Registrar Estado de Ánimo"
                onPress={() => setShowMoodModal(true)}
                variant="outline"
              />
            )}
          </CardContent>
        </Card>

        {/* Profile Actions */}
        <Card style={styles.card}>
          <CardHeader title="Configuración" />
          <CardContent>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => setShowEditModal(true)}
            >
              <Ionicons name="person-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Editar Perfil</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            >
              <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Notificaciones</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            >
              <Ionicons name="shield-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Privacidad</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card style={styles.card}>
          <CardHeader title="Estadísticas" />
          <CardContent>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{moods.length}</Text>
                <Text style={styles.statLabel}>Estados registrados</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Días consecutivos</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Button
          title="Cerrar Sesión"
          onPress={handleSignOut}
          variant="danger"
          style={styles.signOutButton}
        />
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Input
              label="Nombre Completo"
              value={editForm.full_name}
              onChangeText={(text) => setEditForm({ ...editForm, full_name: text })}
              placeholder="Tu nombre completo"
            />

            <Input
              label="Email"
              value={editForm.email}
              editable={false}
              style={{ backgroundColor: COLORS.surface }}
            />

            <Button
              title="Guardar Cambios"
              onPress={handleUpdateProfile}
              disabled={!editForm.full_name.trim()}
            />
          </View>
        </View>
      </Modal>

      {/* Mood Selection Modal */}
      <Modal
        visible={showMoodModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>¿Cómo te sientes hoy?</Text>
            <TouchableOpacity onPress={() => setShowMoodModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.moodOptions}>
              {MOOD_OPTIONS.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={styles.moodOption}
                  onPress={() => handleMoodSelect(mood.value)}
                >
                  <Text style={styles.moodOptionEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodOptionText}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input
              label="Nota (opcional)"
              value={moodNote}
              onChangeText={setMoodNote}
              placeholder="¿Hay algo que quieras agregar?"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white + 'CC',
  },
  content: {
    padding: SPACING.md,
  },
  card: {
    marginBottom: SPACING.lg,
  },
  moodDisplay: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  moodText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  moodNote: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  signOutButton: {
    marginTop: SPACING.lg,
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
  moodOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  moodOption: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  moodOptionEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  moodOptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
});
