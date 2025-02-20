import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addBook, updateBook } from "../db/dbBooks";

export default function AddBookForm({ book, onClose }) {
  const [title, setTitle] = useState(book ? book.title : "");
  const [description, setDescription] = useState(book ? book.description : "");
  const [image, setImage] = useState(book ? book.image : "");

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    if (book) {
      updateBook(book.id, title, description, image, (success) => {
        if (success) {
          alert("Book updated successfully");
          onClose();
        } else {
          alert("Failed to update book");
        }
      });
    } else {
      addBook(title, description, image, (success) => {
        if (success) {
          alert("Book added successfully");
          onClose();
        } else {
          alert("Failed to add book");
        }
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <View style={styles.formHeader}>
          <View>
            <Text style={styles.formTitle}>
              {book ? "Edit Book Details" : "Add New Book"}
            </Text>
            <Text style={styles.formSubtitle}>
              {book ? "Update the book information" : "Enter book details below"}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Title</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="book-outline" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter book title"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description</Text>
          <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter book description"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Image URL</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="image-outline" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={image}
              onChangeText={setImage}
              placeholder="Enter image URL"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {book ? "Save Changes" : "Add Book"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  formCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    margin: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  formSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
  },
  textAreaWrapper: {
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 12,
    marginLeft: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#3B82F6",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
});