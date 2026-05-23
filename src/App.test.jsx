import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// Мокаем дочерние компоненты, чтобы тестировать только логику App
jest.mock('./components/chat/Chat.component', () => () => <div data-testid="chat-component">Chat Component</div>);
jest.mock('./components/imageGenerator/ImageGenerator.component', () => () => <div data-testid="image-generator-component">Image Generator Component</div>);

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  describe('Рендеринг структуры', () => {
    test('рендерит заголовок с тремя кнопками', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
      
      expect(screen.getByText('Image Generator')).toBeInTheDocument();
      expect(screen.getByText('Chat')).toBeInTheDocument();
      expect(screen.getByText('Recipe Generator')).toBeInTheDocument();
    });

    test('рендерит footer с правильным текстом', () => {
      expect(screen.getByText(/© 2026 AI Helper App/i)).toBeInTheDocument();
    });

    test('имеет правильную CSS-структуру', () => {
      const wrapper = document.querySelector('.app-wrapper');
      const header = document.querySelector('.header');
      const main = document.querySelector('.main');
      const footer = document.querySelector('.footer');
      
      expect(wrapper).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Навигация и активные табы', () => {
    test('по умолчанию активна вкладка Image Generator', () => {
      const imageButton = screen.getByText('Image Generator');
      const chatButton = screen.getByText('Chat');
      const recipeButton = screen.getByText('Recipe Generator');
      
      expect(imageButton).toHaveClass('active');
      expect(chatButton).not.toHaveClass('active');
      expect(recipeButton).not.toHaveClass('active');
    });

    test('по умолчанию отображает компонент ImageGenerator', () => {
      expect(screen.getByTestId('image-generator-component')).toBeInTheDocument();
      expect(screen.queryByTestId('chat-component')).not.toBeInTheDocument();
    });

    test('при клике на Chat переключает активный класс', () => {
      const chatButton = screen.getByText('Chat');
      
      fireEvent.click(chatButton);
      
      expect(chatButton).toHaveClass('active');
      expect(screen.getByText('Image Generator')).not.toHaveClass('active');
      expect(screen.getByText('Recipe Generator')).not.toHaveClass('active');
    });

    test('при клике на Chat отображает компонент Chat', () => {
      const chatButton = screen.getByText('Chat');
      
      fireEvent.click(chatButton);
      
      expect(screen.getByTestId('chat-component')).toBeInTheDocument();
      expect(screen.queryByTestId('image-generator-component')).not.toBeInTheDocument();
    });

    test('при клике на Recipe Generator отображает заглушку', () => {
      const recipeButton = screen.getByText('Recipe Generator');
      
      fireEvent.click(recipeButton);
      
      expect(screen.getByText('Recipe Generator Content')).toBeInTheDocument();
      expect(screen.queryByTestId('image-generator-component')).not.toBeInTheDocument();
      expect(screen.queryByTestId('chat-component')).not.toBeInTheDocument();
    });
  });

  describe('Взаимодействие с клавиатурой', () => {
    test('переключение табов через клавишу Enter', async () => {
      const user = userEvent.setup();
      const chatButton = screen.getByText('Chat');
      
      chatButton.focus();
      await user.keyboard('{Enter}');
      
      expect(chatButton).toHaveClass('active');
      expect(screen.getByTestId('chat-component')).toBeInTheDocument();
    });

    test('переключение табов через пробел', async () => {
      const user = userEvent.setup();
      const recipeButton = screen.getByText('Recipe Generator');
      
      recipeButton.focus();
      await user.keyboard(' ');
      
      expect(recipeButton).toHaveClass('active');
      expect(screen.getByText('Recipe Generator Content')).toBeInTheDocument();
    });
  });

  describe('Адаптивность и состояния', () => {
    test('последовательное переключение между всеми табами', () => {
      const imageButton = screen.getByText('Image Generator');
      const chatButton = screen.getByText('Chat');
      const recipeButton = screen.getByText('Recipe Generator');
      
      // Начинаем с Image
      expect(screen.getByTestId('image-generator-component')).toBeInTheDocument();
      
      // Переключаем на Chat
      fireEvent.click(chatButton);
      expect(screen.getByTestId('chat-component')).toBeInTheDocument();
      
      // Переключаем на Recipe
      fireEvent.click(recipeButton);
      expect(screen.getByText('Recipe Generator Content')).toBeInTheDocument();
      
      // Возвращаемся на Image
      fireEvent.click(imageButton);
      expect(screen.getByTestId('image-generator-component')).toBeInTheDocument();
      
      // Все кнопки имеют правильные классы
      expect(imageButton).toHaveClass('active');
      expect(chatButton).not.toHaveClass('active');
      expect(recipeButton).not.toHaveClass('active');
    });
  });
});