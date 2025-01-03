import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';
import './Form.css'; // Optional for additional styling

const Form = () => {
    const [data, setData] = useState();
    const [scoreError,setScoreError] = useState('');
    const [trainingError, setTrainingError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [serviceError, setServiceError] = useState('');

    const [formData, setFormData] = useState({
        department: '',
        region: '',
        education: '',
        gender: '',
        recruitment_channel: '',
        no_of_trainings: '',
        age: '',
        previous_year_rating: '',
        length_of_service: '',
        KPIs_met: '',
        awards_won: '',
        avg_training_score: ''
    });
    const [userName, setUserName] = useState(''); // State to hold the user's name

    const navigate = useNavigate();
    const auth = getAuth();

    // Check if the user is logged in and get their name
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                Swal.fire({
                    icon: 'warning',
                    title: 'You are not logged in',
                    text: 'Please log in to access the prediction feature!',
                    confirmButtonText: 'Go to Login'
                }).then(() => {
                    navigate('/login'); // Redirect to login page
                });
            } else {
                setUserName(user.displayName || 'User'); // Set the user's name or a default if not available
            }
        });
    }, [auth, navigate]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    useEffect(()=>{
        if(formData.no_of_trainings!='' && formData.no_of_trainings <= 0){
            setTrainingError('Number of training cannot be negative value')
        }
        else{
            setTrainingError('');
        }

        if(formData.age!='' && formData.age <= 0){
            setAgeError('Age cannot be negative value')
        }
        else{
            setAgeError('');
        }
        
        if(formData.length_of_service!='' && formData.length_of_service <= 0){
            setServiceError('Service Length cannot be negative value')
        }
        else{
            setServiceError('');
        }
        

        if(formData.avg_training_score!='' && (formData.avg_training_score <= 0 || formData.avg_training_score >= 101)){
            setScoreError("Average Training Score must be between 1 to 100")
        }
        else{
            setScoreError('');
        }
    },[formData])

    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Prediction Result:", data);
                setData(data);
                document.getElementById('my_modal_5').showModal();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className='py-32 bg-gray-100'>
            <div className="max-w-4xl mx-auto py-10 px-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-500">Employee Promotion Prediction</h2>
                <form id="predictionForm" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* First Block */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="department">Department</label>
                        <select 
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Enter Department"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition">
                            <option value="">Department</option>
                            <option value="HR">HR</option>
                            <option value="R&D">R&D</option>
                            <option value="Sales & Marketing">Sales & Marketing</option>
                            <option value="Analytics">Analytics</option>
                            <option value="Technology">Technology</option>
                            <option value="Operations">Operations</option>
                            <option value="Procurement">Procurement</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="region">Region</label>
                        <select  type="text"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            placeholder="Enter Region"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        >
                            <option value="">Region</option>
                            <option value="region_1">region_1</option>
                            <option value="region_2">region_2</option>
                            <option value="region_3">region_3</option>
                            <option value="region_4">region_4</option>
                            <option value="region_5">region_5</option>
                            <option value="region_6">region_6</option>
                            <option value="region_7">region_7</option>
                            <option value="region_8">region_8</option>
                            <option value="region_9">region_9</option>
                            <option value="region_10">region_10</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="education">Education</label>
                        <select type="text"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            placeholder="Enter Education"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        >
                            <option value="">Education</option>
                            <option value="Bachelor">Bachelor's</option>
                            <option value="Masters">Master's & above</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">Gender</label>
                        <select type="text"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            placeholder="Enter Gender"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        >
                            <option value="">Gender</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="recruitment_channel">Recruitment Channel</label>
                         <select type="text"
                            id="recruitment_channel"
                            name="recruitment_channel"
                            value={formData.recruitment_channel}
                            onChange={handleChange}
                            placeholder="Recruitment Channel..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        >
                            <option value="">Recruitment Channel</option>
                            <option value="sourcing">Sourcing</option>
                            <option value="Other">Others</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="no_of_trainings">Number of Trainings</label>
                        <input
                            type="number"
                            id="no_of_trainings"
                            name="no_of_trainings"
                            value={formData.no_of_trainings}
                            onChange={handleChange}
                            placeholder="Number of Trainings..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        />
                         <h1 className='text-red-500'>
                            {trainingError}
                        </h1>
                    </div>

                    {/* Second Block */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        />
                        <h1 className='text-red-500'>
                            {ageError}
                        </h1>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="previous_year_rating">Previous Year Rating</label>  
                        <select type="number"
                            id="previous_year_rating"
                            name="previous_year_rating"
                            value={formData.previous_year_rating}
                            onChange={handleChange}
                            placeholder="Previous Year Rating..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        >
                            <option value="">Previous Year Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="length_of_service">Length of Service</label>
                        <input
                            type="number"
                            id="length_of_service"
                            name="length_of_service"
                            value={formData.length_of_service}
                            onChange={handleChange}
                            placeholder="Length of Service..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        />
                        <h1 className='text-red-500'>
                            {serviceError}
                        </h1>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="KPIs_met">KPIs Met >80% ?</label>

                       <select type="number"
                            id="KPIs_met"
                            name="KPIs_met"
                            value={formData.KPIs_met}
                            onChange={handleChange}
                            placeholder="KPIs Met >80% ?"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        >
                            <option value="">KPIs Met >80%</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="awards_won">Awards Won ?</label>
                         <select  type="number"
                            id="awards_won"
                            name="awards_won"
                            value={formData.awards_won}
                            onChange={handleChange}
                            placeholder="Awards Won?"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        >
                            <option value="">Awards Won?</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="avg_training_score">Average Training Score</label>
                        <input
                            type="number"
                            id="avg_training_score"
                            name="avg_training_score"
                            value={formData.avg_training_score}
                            onChange={handleChange}
                            placeholder="Average Training Score..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 transition"
                        />
                        <h1 className='text-red-500'>
                            {scoreError}
                        </h1>
                    </div>

                    <button type="submit" className="col-span-1 sm:col-span-2 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
                        Predict Promotion
                    </button>
                </form>

                {/* Modal using the dialog element */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Prediction Result</h3>
                        <p className="py-4">
                            {data?.promotion_prediction === 1 ? (
                                <p>Congratulations {userName}! You are going to be promoted.</p>
                            ) : (
                                <p>Alas {userName}! Unfortunately, you are not going to be promoted this time. Keep up the hard work!</p>
                            )}
                        </p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => document.getElementById('my_modal_5').close()}>Close</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Form;
