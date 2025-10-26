# 🌍 Around - Social Media Photo Sharing Platform

A modern, full-stack React application that allows users to share and discover beautiful places through photos. Built with authentication, real-time interactions, and a responsive design.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## ✨ Features

### 🔐 **Authentication & Security**

- **JWT-based authentication** with secure token storage
- **Protected routes** ensuring only authenticated users access the main app
- **User registration and login** with comprehensive error handling
- **Automatic token validation** on app initialization
- **Secure logout** with complete session cleanup

### 👤 **User Profile Management**

- **Dynamic profile editing** with real-time updates
- **Avatar upload and management** with image preview
- **Personalized user information** display
- **Context-based state management** for user data

### 📸 **Photo Sharing & Interaction**

- **Add new photo posts** with title and image URL
- **Like/unlike functionality** with real-time counter updates
- **Delete posts** (owner-only functionality)
- **Image popup viewer** for full-size photo viewing
- **Responsive card grid layout**

### 🎨 **Modern UI/UX**

- **Responsive design** that works on all devices
- **Modal popups** for seamless user interactions
- **Loading states** and error handling
- **Success/error notifications** with visual feedback
- **Clean, modern interface** with smooth animations

## 🛠️ **Technical Stack**

### **Frontend Technologies**

- **React 19.1.0** - Latest React with modern hooks and features
- **React Router DOM 7.9.4** - Client-side routing and navigation
- **Vite 7.0.4** - Lightning-fast build tool and dev server
- **ESLint** - Code quality and consistency enforcement

### **Architecture & Patterns**

- **Component-based architecture** with reusable, modular components
- **Context API** for global state management
- **Custom hooks** for authentication logic
- **Protected route pattern** for secure navigation
- **API abstraction layer** for clean data management

### **Development Tools**

- **ESLint** with React-specific rules
- **Vite HMR** for instant development feedback
- **Modern JavaScript (ES6+)** features throughout

## 🚀 **Getting Started**

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd web_project_around_auth
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 **Project Structure**

```
src/
├── components/           # Reusable UI components
│   ├── Header/          # Navigation and authentication
│   ├── Footer/          # Site footer
│   ├── Main/            # Main content area
│   │   └── components/  # Main-specific components
│   │       ├── Card/    # Photo card component
│   │       └── Popup/   # Modal components
│   ├── Login.jsx        # Authentication forms
│   ├── Register.jsx
│   └── ProtectedRoute.jsx
├── contexts/            # React Context providers
├── utils/               # Utility functions
│   ├── api.js          # API communication layer
│   └── auth.js         # Authentication utilities
└── images/             # Static assets
```

## 🔧 **Key Technical Implementations**

### **Authentication Flow**

```javascript
// JWT token management with automatic validation
useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    auth
      .checkToken(token)
      .then((res) => {
        if (res) {
          setEmail(res.data.email);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error("Token inválido:", err);
        localStorage.removeItem("jwt");
      });
  }
}, []);
```

### **API Integration**

- **RESTful API communication** with proper error handling
- **Centralized API class** for consistent data management
- **Promise-based architecture** with async/await patterns

### **State Management**

- **React Context** for user data sharing
- **Local state management** with useState hooks
- **Optimistic updates** for better user experience

## 🎯 **My Technical Strengths Demonstrated**

### **1. Modern React Development**

- ✅ **Latest React 19** with modern hooks and patterns
- ✅ **Component composition** and reusability
- ✅ **Context API** for state management
- ✅ **Custom hooks** for authentication logic

### **2. Authentication & Security**

- ✅ **JWT implementation** with secure storage
- ✅ **Protected routes** pattern
- ✅ **Token validation** and automatic cleanup
- ✅ **Error handling** for authentication failures

### **3. API Integration & Data Management**

- ✅ **RESTful API** communication
- ✅ **Centralized API layer** with error handling
- ✅ **Promise-based** async operations
- ✅ **Real-time data updates**

### **4. User Experience & Interface**

- ✅ **Responsive design** principles
- ✅ **Modal interactions** and popup management
- ✅ **Loading states** and user feedback
- ✅ **Intuitive navigation** flow

### **5. Code Quality & Architecture**

- ✅ **ESLint configuration** for code consistency
- ✅ **Modular component structure**
- ✅ **Separation of concerns** (API, auth, UI)
- ✅ **Clean, readable code** with comments

### **6. Development Workflow**

- ✅ **Vite build system** for fast development
- ✅ **Hot module replacement** for instant feedback
- ✅ **Modern JavaScript** (ES6+) features
- ✅ **Package management** with npm

## 🌟 **What Makes This Project Special**

1. **Production-Ready Architecture** - Built with scalability and maintainability in mind
2. **Security-First Approach** - Proper authentication and authorization implementation
3. **Modern Development Practices** - Latest React features and best practices
4. **User-Centric Design** - Intuitive interface with excellent user experience
5. **Clean Code Standards** - Well-organized, documented, and maintainable codebase

## 🔮 **Future Enhancements**

- [ ] Image upload functionality
- [ ] Real-time notifications
- [ ] User search and discovery
- [ ] Advanced filtering and sorting
- [ ] Mobile app development
- [ ] Performance optimizations

## 📞 **Contact**

Ready to discuss this project or explore collaboration opportunities? Let's connect!

---

_Built with ❤️ using modern web technologies and best practices_
