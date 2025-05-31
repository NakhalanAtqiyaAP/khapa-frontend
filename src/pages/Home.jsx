import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { authApi } from '../services/api';
import Swal from 'sweetalert2';
import GoalCard from '../components/GoalCard';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    text: '',
    date: new Date().toISOString().split('T')[0] 
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await authApi.getGoals();
      setGoals(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.text.trim()) return;

    try {
      const goalData = {
        ...newGoal,
        user_id: user.id 
      };
      
      const response = await authApi.createGoal(goalData);
      setGoals([...goals, response.data]);
      setNewGoal({
        text: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Goal added!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add goal',
        timer: 1500
      });
    }
  };

  const handleUpdateGoal = async (id, updatedData) => {
    try {
      await authApi.updateGoal(id, updatedData);
      setGoals(goals.map(goal => 
        goal._id === id ? { ...goal, ...updatedData } : goal
      ));
      
      Swal.fire({
        icon: 'success',
        title: 'Goal updated!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update goal',
        timer: 1500
      });
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await authApi.deleteGoal(id);
      setGoals(goals.filter(goal => goal._id !== id));
      
      Swal.fire({
        icon: 'success',
        title: 'Goal deleted!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete goal',
        timer: 1500
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <h1 className="my-4">Welcome to KhapaSite</h1>
      
      <section className="mb-5">
        <h2 className="mb-3">Our Goals</h2>
        {user && (
                <div className="win-card mb-4">
  <div className="p-2">
    <form onSubmit={handleAddGoal} className="space-y-3">
      <div>
        <label className="block mb-1">Add New Goal</label>
        <div className="space-y-2">
          <input
            type="date"
            name="date"
            value={newGoal.date}
            onChange={handleInputChange}
            className="win-input w-full"
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="text"
              value={newGoal.text}
              onChange={handleInputChange}
              placeholder="Enter goal text"
              className="win-input flex-1"
            />
            <button 
              type="submit" 
              className="win-button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
          
            )}
           
        {loading ? (
          <p>Loading goals...</p>
        ) : (
          <>
            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
              {goals.slice(0, 3).map((goal) => (
                <Col key={goal.id}>
                  <GoalCard
                    goal={goal}
                    onUpdate={handleUpdateGoal}
                    onDelete={handleDeleteGoal}
                    editable={!!user && user.id === goal.user_id}
                  />
                </Col>
              ))}
            </Row>
            
            
            <Button 
              as="a" 
              href="/goals" 
              variant="outline-primary" 
              className="retro-btn"
            >
              View All Goals
            </Button>
          </>
        )}
      </section>
    </Container>
  );
};

export default HomePage;