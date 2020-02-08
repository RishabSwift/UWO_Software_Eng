package sample;

import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;
import javafx.scene.control.RadioButton;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

public class BeautifulFlowersController implements Initializable {
    @FXML
    private ImageView flowersImageView;
    @FXML
    private Label flowersNote;
    @FXML
    private RadioButton roseRadioButton;
    @FXML
    private RadioButton callaLilyRadioButton;
    @FXML
    private RadioButton cannaRadioButton;
    @FXML
    private RadioButton bleedingHeartRadioButton;
    @FXML
    private RadioButton cherryBlossomRadioButton;

    // ADD LINES FOR TASK #3 HERE

    // Declare private fields for the images

    private Image roseImage;
    private Image callaLilyImage;
    private Image cannaImage;
    private Image bleedingHeartImage;
    private Image cherryBlossomImage;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // Load the image files in the intialize method
        roseImage = new Image("file:src/images/Rose.gif");
        callaLilyImage = new Image("file:src/images/Calla Lily.gif");
        cannaImage = new Image("file:src/images/Canna.gif");
        bleedingHeartImage = new Image("file:src/images/Bleeding Heart.gif");
        cherryBlossomImage = new Image("file:src/images/Cherry Blossom.gif");
    }

    public void roseRadioButtonListener() {
        // ADD THE LINES FOR TASK #3 HERE // If this radio button is selected, // display image and data for Rose.
        flowersImageView.setImage(roseImage);
        flowersNote.setText("This beautiful flower and symbol of love belongs the genus Rosa. The family name of this flower is Rosaceae and it contains different other species in almost all parts of the world. The flower of rose vary in size from each other depending upon the species to which they belong. A large number of species of this flower are found in different parts of Asia.");
    }

    public void callaLilyRadioButtonListener(ActionEvent actionEvent) {
        flowersImageView.setImage(callaLilyImage);
        flowersNote.setText("One simple and common name of this beautiful flower is arum lily and this flowering plant belongs to the family known as Araceae. This flowering plant is grown well in areas which have reasonable rainfall and moderate temperatures.");
    }

    public void cannaRadioButtonListener(ActionEvent actionEvent) {
        flowersImageView.setImage(cannaImage);
        flowersNote.setText("This beautiful flowering plant belongs to a genus that contains around 10 species and its family is know as Cannaceae. This flower plant also provides large quantity of starch which is further used for different purposes. This flower is mostly found in tropical regions of the world. The flower of this plant have three sepals and three petals.");
    }

    public void bleedingHeartRadioButtonListener(ActionEvent actionEvent) {
        flowersImageView.setImage(bleedingHeartImage);
        flowersNote.setText("The bleeding heart flower belongs tot the family know as Papaveraceae. This heart shaped flower is famous all over the world due to its unique beauty and is found in great numbers in Siberia and China. Blooming season of this flower starts in spring when there spread beautiful pink heart-shaped flowers in gardens.  Lady-in-a-bath is also a common name of this flower.");
    }

    public void cherryBlossomRadioButtonListener(ActionEvent actionEvent) {
        flowersImageView.setImage(cherryBlossomImage);
        flowersNote.setText("Cherry blossom, a beautiful flowering plant is found in different parts of the world including the Northern hemisphere.  It is found in those areas which have moderate climate. All species of this flowering plant do not produce cherries at all as there are special species of the flower that produce edible cherries.");
    }
}
// Repeat and modify the above handler for the rest of the other flowers. }