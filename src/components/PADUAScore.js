const PADUAScore = ({ inputs, riskFactors }) => {
    const calculateScore = () => {
      return riskFactors.reduce((score, rf) => {
        return score + (inputs[rf.field] ? rf.score : 0);
      }, 0);
    };
  
    const score = calculateScore();
    const riskLevel = score >= 4 ? "High Risk" : "Low Risk";
  
    return (
      <div>
        <h3>PADUA Score: {score}</h3>
        <p>Risk Level: {riskLevel}</p>
      </div>
    );
  };
  
  export default PADUAScore;
  