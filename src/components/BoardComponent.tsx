import React, { Component } from "react";
import { connect } from "react-redux";
import { CellInfo } from "../types";
import { View, StyleSheet, Text } from "react-native";
import CellComponent from "./CellComponent";
import { GameState } from "../reducer";

interface Props {
  gameInfo: CellInfo[][];
}

class BoardComponent extends Component<Props> {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Tic Tac Toe</Text>
        {this.props.gameInfo.map((row: CellInfo[]) => {
          return (
            <View key={this.props.gameInfo.indexOf(row)} style={styles.row}>
              <CellComponent key={this.props.gameInfo.indexOf(row) + "0"} cellInfo={row[0]} />
              <CellComponent key={this.props.gameInfo.indexOf(row) + "1"} cellInfo={row[1]} />
              <CellComponent key={this.props.gameInfo.indexOf(row) + "2"} cellInfo={row[2]} />
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 22,
    margin: 20
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const mapStateToProps = (state: {gameInfo: GameState}): Props => {
    return {
        gameInfo: state.gameInfo.boardData
    };
};

export default connect(mapStateToProps)(BoardComponent);
