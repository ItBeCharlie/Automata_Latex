
import java.util.HashMap;
import java.util.Scanner;
import java.util.ArrayList;
import java.io.*;

class App {
    public static void main(String[] args) throws IOException {
        Scanner input = new Scanner(new File(args[0]));

        HashMap<String, State> states = new HashMap<>();
        State start = null;
        ArrayList<State> finals = new ArrayList<>();

        boolean transitionStage = false;

        input.nextLine();
        while (input.hasNextLine()) {
            String[] line = input.nextLine().split(",");

            if (line[0].equalsIgnoreCase("currentState")) {
                transitionStage = true;
                continue;
            }

            if (line[0].equalsIgnoreCase("start")) {
                start = states.get(line[1]);
                continue;
            }

            if (line[0].equalsIgnoreCase("final")) {
                String[] stateNames = line[1].split(":");
                for (int i = 0; i < stateNames.length; i++)
                    finals.add(states.get(stateNames[i]));
                continue;
            }

            if (transitionStage) {
                states.get(line[0]).addTransition(line[1], states.get(line[2]));
            } else {
                states.put(line[0], new State(line[0], line[1], line[2]));
            }
        }

        System.out.println(states);
        System.out.println(start);
        System.out.println(finals);
        for (State state : states.values()) {
            System.out.println(state.getTransitions());
        }
    }
}

class State {
    private String xPosition;
    private String yPosition;
    private String name;
    private HashMap<String, State> transitions;

    public State(String name, String xPosition, String yPosition) {
        this.name = name;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.transitions = new HashMap<String, State>();
    }

    public void addTransition(String label, State state) {
        this.transitions.put(label, state);
    }

    public String[] getPos() {
        return new String[] { this.xPosition, this.yPosition };
    }

    public String getTransitions() {
        return transitions.toString();
    }

    public String toString() {
        return this.name;
    }
}
