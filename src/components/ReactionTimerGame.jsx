import { useEffect, useState } from "react";

const ReactionTimerGame = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setStartTime(Date.now());
    setResult(null);
    setIsRunning(true);
    setTimeoutReached(false);
  };
  const handleStop = () => {
    if (!isRunning || startTime === null) return;
    const now = Date.now();

    const elapsed = (now - startTime) / 1000;
    const diff = Math.abs(elapsed - 10);
    setResult(diff);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 10500);

    return () => clearTimeout(timer);
  }, [isRunning]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-8 bg-white shadow-xl">
      <h1 className="text-2xl font-bold">⏱️ 10초 반응 게임</h1>

      {!isRunning && result === null && (
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          onClick={handleStart}
        >
          시작
        </button>
      )}

      {isRunning && (
        <>
          <p className="text-lg">10초가 되었다고 생각되면 누르세요!</p>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
            onClick={handleStop}
          >
            지금!
          </button>
        </>
      )}

      {result !== null && (
        <div className="text-center">
          <p className="text-xl font-bold">
            ⏱️ {result.toFixed(2)}초 차이로 정답과{" "}
            {result < 0.5 ? "아주 가까웠어요! 🎯" : "조금 멀었어요! 🙏"}
          </p>

          <button
            onClick={handleStart}
            className="mt-6 py-2 border-gray-400 rounded-lg hover:bg-gray-100"
          >
            다시 도전하기
          </button>
        </div>
      )}

      {timeoutReached && (
        <p className="text-red-500 mt-2">10초가 지나도 누르지 않았어요!</p>
      )}
    </div>
  );
};

export default ReactionTimerGame;