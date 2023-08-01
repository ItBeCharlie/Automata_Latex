package Java;

import java.util.HashMap;

public class State {
    private int xPosition;
    private int yPosition;
    private String name;
    private HashMap<String, State> transitions;

    public State(String name, int xPosition, int yPosition) {
        this.name = name;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.transitions = new HashMap<String, State>();
    }

    public void addTransition(String label, State state) {
        this.transitions.put(label, state);
    }

    public int[] getPos() {
        return new int[] { this.xPosition, this.yPosition };
    }

    public String getTransitions() {
        return transitions.toString();
    }

    public String toString() {
        return this.name;
    }
}
