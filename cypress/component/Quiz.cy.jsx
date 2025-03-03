
// Component tests for Quiz component

import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  it('should render the Quiz component', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz when the start button is clicked', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').should('be.visible');
  });

  it('should display the next question when an answer is selected', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.btn-primary').first().click();
    cy.get('h2').should('be.visible');
  });

  it('should display the final score when the quiz is completed', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    for (let i = 0; i < 10; i++) {
      cy.get('.btn-primary').first().click();
    }
    cy.get('.alert-success').should('be.visible');
  });

  it('should allow starting a new quiz after completion', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    for (let i = 0; i < 10; i++) {
      cy.get('.btn-primary').first().click();
    }
    cy.get('.alert-success').should('be.visible');
    cy.get('button').contains('Take New Quiz').click();
    cy.get('button').contains('Start Quiz').should('be.visible');
  });
});
