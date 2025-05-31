// import React, { useState, useEffect } from 'react';
// import { authApi } from '../services/api';
// import GoalCard from '../components/GoalCard';
// import { useAuth } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';

// const HomePage = () => {
//   const [goals, setGoals] = useState([]);
//   const [newGoal, setNewGoal] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   const fetchGoals = async () => {
//     try {
//       const response = await authApi.getGoals();
//       setGoals(response.data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const handleAddGoal = async (e) => {
//     e.preventDefault();
//     if (!newGoal.trim()) return;

//     try {
//       const response = await authApi.createGoal({ text: newGoal });
//       setGoals([...goals, response.data]);
//       setNewGoal('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdateGoal = async (id, updatedText) => {
//     try {
//       await authApi.updateGoal(id, { text: updatedText });
//       setGoals(goals.map(goal => 
//         goal._id === id ? { ...goal, text: updatedText } : goal
//       ));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteGoal = async (id) => {
//     try {
//       await authApi.deleteGoal(id);
//       setGoals(goals.filter(goal => goal._id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Welcome to RetroSite</h1>
      
//       <section className="mb-6">
//         <h2 className="text-xl mb-3">Our Goals</h2>
//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//               {goals.slice(0, 3).map((goal) => (
//                 <GoalCard
//                   key={goal._id}
//                   goal={goal}
//                   onUpdate={handleUpdateGoal}
//                   onDelete={handleDeleteGoal}
//                   editable={!!user}
//                 />
//               ))}
//             </div>
            
//             {user && (
//               <div className="win-card mb-4">
//                 <div className="p-2">
//                   <form onSubmit={handleAddGoal}>
//                     <div className="mb-2">
//                       <label className="block mb-1">Add New Goal</label>
//                       <div className="flex">
//                         <input
//                           type="text"
//                           value={newGoal}
//                           onChange={(e) => setNewGoal(e.target.value)}
//                           placeholder="Enter goal text"
//                           className="win-input flex-1"
//                         />
//                         <button 
//                           type="submit" 
//                           className="win-button ml-2"
//                         >
//                           Add
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </section>
//     </div>
//   );
// };

// export default HomePage;