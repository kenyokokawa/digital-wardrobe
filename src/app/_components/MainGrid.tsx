import CategoryRow from "./CategoryRow";

const MOCK_IMGS = {
  tops: [
    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqoVgaPf9bZM2BPQFzkd3AfrNpHSsY6wa8bWLEt",
      id: "1",
    },
    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqovJzF0V7CugtOf5DdJajEzeAUrcZlhP3Fp26N",
      id: "2",
    },

    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqowLK6VLv0mbZlg7H62UyNTr1fVtQGsYFzehia",
      id: "4",
    },
    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqodAlkXD8ac2rXLSlN4CWgmhxwA7Y5QotFGe31",
      id: "5",
    },
    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqo0AHyduOA5XOL7fEIMkvY9RZgy2izlboUQGpD",
      id: "6",
    },
  ],
  bottoms: [
    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqo3GMGl5NAQ9OMpeXSRiLCwUqDjJnlHBhWuYsm",
      id: "3",
    },
    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqoGkMqWCFuRD2c8vJFdqIb9lKastfAgxEHrNwi",
      id: "7",
    },
    {
      url: "https://206x4l9gli.ufs.sh/f/loTNdKRnSVqoo1WsS7Lm8oyhKRBrlI5kagdTn1cqA40iEzxj",
      id: "8",
    },
  ],
};

const MainGrid = () => {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <CategoryRow category="Tops" items={MOCK_IMGS.tops} />
      <CategoryRow category="Bottoms" items={MOCK_IMGS.bottoms} />
    </div>
  );
};

export default MainGrid;
