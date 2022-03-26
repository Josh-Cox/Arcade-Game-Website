<?php   
    include_once 'navbar.php';

    if (isset($_POST["Score"])) {

        $Score = $_POST["Score"];
        
        require_once 'includes/dbh.inc.php';
        require_once 'includes/functions.inc.php';
        require_once 'index.php';

        
        echo json_encode(['code'=>404, 'msg'=>$errorMSG]);
        addScore($conn, $Username, $Score);
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Leaderboard</title>
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <div class="main">
            <div class="welcome">
                <h1>Leaderboard</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <?php
                        $conn = mysqli_connect("localhost", "coursework", "courseworkwebdev", "coursework", 1111);
                        $result = mysqli_query($conn, "SELECT Username, Score FROM Scores ORDER BY Score DESC");
                        $ranking = 1;
                
                        if (mysqli_num_rows($result)) {
                            while ($row = mysqli_fetch_array($result)) {
                                echo "<tr>
                                <td>{$row['Username']}</td>
                                <td>{$row['Score']}</td>
                                </tr>";
                                $ranking++;
                            }
                        }
                    ?>
                    
                </tbody>
            </table>
        </div>
    </body> 
</html>