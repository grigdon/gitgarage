import "../pages_css/UserProfile.css";
import { Car } from "../types/Car";

// Placeholder user data 
const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
};

// Placeholder cars (fetch from a real source later)
const userCars: Car[] = [
    { id: 1,  nickname: "Speedster", year: 2020, make: "Ford", model: "Mustang", trim: "GT", engine: "5.0L V8", transmission: "Manual" },
    { id: 22, nickname: "EcoRide", year: 2022, make: "Toyota", model: "Prius", trim: "Limited", engine: "Hybrid", transmission: "Automatic" },
];

export function UserProfile() {
    return (
        <div className="user-profile-container">
            <h1>User Profile</h1>
            <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
            </div>

            <h2>My Cars</h2>
            <div className="cars-list">
                {userCars.length > 0 ? (
                    userCars.map((car, index) => (
                        <div key={index} className="car-card">
                            <h3>{car.nickname}</h3>
                            <p>{car.year} {car.make} {car.model}</p>
                            <p><strong>Trim:</strong> {car.trim}</p>
                            <p><strong>Engine:</strong> {car.engine}</p>
                            <p><strong>Transmission:</strong> {car.transmission}</p>
                        </div>
                    ))
                ) : (
                    <p>No cars registered yet.</p>
                )}
            </div>
        </div>
    );
}

export default UserProfile;