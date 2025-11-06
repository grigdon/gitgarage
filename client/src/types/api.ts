// client/src/types/api.ts

// Matches your backend's UserLoginDto
export interface UserLoginDto {
  email: string;
  passwordHash: string; // Your DTO uses PasswordHash
}

// Matches your backend's UserRegistrationDto
export interface UserRegistrationDto {
  username: string;
  email: string;
  passwordHash: string; 
}

// What the backend sends back on successful login
// (This is an assumption, we can adjust it)
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}