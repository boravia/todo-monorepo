import "../globals.css";
export type ActiveButton = 'All' | 'Todo' | 'Done';

interface NavigationProps {
    activeButton: ActiveButton;
    onSetButton: (buttonState: ActiveButton) => void;
}

export default function Navigation({ activeButton, onSetButton }: NavigationProps) {
    const activeButtons: ActiveButton[] = ['All', 'Done', 'Todo']
    return (
        <div className="grid grid-cols-3 bg-red-500 m-12 mx-6 rounded-xl">
            {activeButtons.map((buttonState) => (
                <button onClick={() => onSetButton(buttonState)}
                key={buttonState}
                className={`btn ${activeButton === buttonState ? 'toggle' : ''}`}
                >
                {buttonState}
                </button>
            ))}
        </div>
    );
}