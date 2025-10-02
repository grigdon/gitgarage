import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal } from "../components/Modal";
import { Car } from "../types/Car.ts";
import "../components_css/Modal.css"

interface AddCarModalProps {
    isOpen: boolean;
    onSubmit: SubmitHandler<Car>;
    onCancel: (message: string) => void;
    onClose: (message: string) => void;
}

export const AddCarModal: React.FC<AddCarModalProps> = ({ isOpen, onSubmit, onCancel, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Car>();

    const handleModalSubmit = () => {
        handleSubmit(onSubmit)(); 
    };
    
    if (!isOpen) return null;

    return (
        <Modal onSubmit={handleModalSubmit} onCancel={onCancel} onClose={onClose}>
            <div className="form-container">
                <h2>Sign up your vehicle here.</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="car-form">
                    <div className="form-group">
                        <label htmlFor="nickname">Nickname</label>
                        <input
                            id="nickname"
                            {...register("nickname", { required: "Nickname is required" })}
                            className="form-input"
                        />
                        {errors.nickname && <span className="error">{errors.nickname.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input
                            id="year"
                            type="number"
                            {...register("year", {
                                required: "Year is required",
                                min: { value: 1886, message: "Year must be 1886 or later" },
                                max: { value: 2025, message: "Year cannot be in the future" }
                            })}
                            className="form-input"
                        />
                        {errors.year && <span className="error">{errors.year.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="make">Make</label>
                        <input
                            id="make"
                            {...register("make", { required: "Make is required" })}
                            className="form-input"
                        />
                        {errors.make && <span className="error">{errors.make.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input
                            id="model"
                            {...register("model", { required: "Model is required" })}
                            className="form-input"
                        />
                        {errors.model && <span className="error">{errors.model.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="trim">Trim</label>
                        <input
                            id="trim"
                            {...register("trim", { required: "Trim is required" })}
                            className="form-input"
                        />
                        {errors.trim && <span className="error">{errors.trim.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="engine">Engine</label>
                        <input
                            id="engine"
                            {...register("engine", { required: "Engine is required" })}
                            className="form-input"
                        />
                        {errors.engine && <span className="error">{errors.engine.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="transmission">Transmission</label>
                        <input
                            id="transmission"
                            {...register("transmission", { required: "Transmission is required" })}
                            className="form-input"
                        />
                        {errors.transmission && <span className="error">{errors.transmission.message}</span>}
                    </div>
                </form>
            </div>
        </Modal>
    );
};

