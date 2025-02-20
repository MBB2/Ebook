import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ImageBackground,
} from "react-native";
import { createTable, getBooks, deleteBook } from "../db/dbBooks";
import AddBookForm from "./AddBookForm";
import { Ionicons } from "@expo/vector-icons";

export default function BookListAdmin() {
  const [books, setBooks] = useState([]);
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    createTable();
    loadBooks();
  }, []);

  const loadBooks = useCallback(() => {
    getBooks((booksData) => {
      setBooks(booksData);
    });
  }, []);

  const handleDeleteBook = (id) => {
    if (!id) return;
    deleteBook(id, (success) => {
      if (success) {
        loadBooks();
        Alert.alert("Success", "Book deleted successfully");
      } else {
        Alert.alert("Error", "Failed to delete book");
      }
    });
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setEditPopupVisible(true);
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookImagePlaceholder}>
        <Ionicons name="book" size={40} color="#6B7280" />
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.bookDescription}>
          {item.description}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editBtn]}
            onPress={() => handleEditBook(item)}
          >
            <Ionicons name="pencil" size={18} color="#3B82F6" />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteBtn]}
            onPress={() => handleDeleteBook(item.id)}
          >
            <Ionicons name="trash" size={18} color="#EF4444" />
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://example.com/placeholder.jpg' }}
        style={styles.header}
      >
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>My Library</Text>
          <Text style={styles.headerSubtitle}>Manage your book collection</Text>
        </View>
      </ImageBackground>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="library" size={60} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>Your library is empty</Text>
            <Text style={styles.emptyStateSubtext}>
              Add some books to get started
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setAddPopupVisible(true)}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      <Modal
        visible={isAddPopupVisible || isEditPopupVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <AddBookForm
            book={selectedBook}
            onClose={() => {
              setAddPopupVisible(false);
              setEditPopupVisible(false);
              setSelectedBook(null);
              loadBooks();
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    height: 180,
  },
  headerOverlay: {
    height: 180,
    backgroundColor: "rgba(59, 130, 246, 0.9)",
    padding: 20,
    justifyContent: "flex-end",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E5E7EB",
    marginTop: 5,
  },
  bookList: {
    padding: 16,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bookImagePlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  bookInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  editBtn: {
    backgroundColor: "#EBF5FF",
  },
  deleteBtn: {
    backgroundColor: "#FEE2E2",
  },
  editBtnText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
  deleteBtnText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "500",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4B5563",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
});