import { Box, Button, Container, Paper, Typography, Card, Grid, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RestaurantMenu from "@mui/icons-material/RestaurantMenu";

export default function Home() {

  const features = [
    {
      icon: <CalendarMonth fontSize="large" color="primary" />,
      title: "Planification des Repas",
      description:
        "Planifiez vos repas pour toute la semaine sans effort, assurant une alimentation équilibrée et organisée.",
    },
    {
      icon: <ShoppingCart fontSize="large" color="primary" />,
      title: "Liste de Courses",
      description:
        "Générez automatiquement une liste de courses basée sur votre planning de repas.",
    },
    {
      icon: <RestaurantMenu fontSize="large" color="primary" />,
      title: "Gestion des Recettes",
      description:
        "Sauvegardez et organisez vos recettes préférées, facilitant leur accès et leur utilisation quand vous en avez besoin.",
    },
  ];

  return (
    <Box sx={{ marginTop: 4, width: "100%" }}>
      <Container>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "2.25rem",
            fontFamily:
              "ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
            lineHeight: 1.5,
            marginBottom: 2,
          }}
        >
          Planifiez <span style={{ color: "#059668" }}>Vos Repas</span>,
          Simplifiez <span style={{ color: "#059668" }}>Vos Courses</span>
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "1.25rem",
            fontFamily:
              "ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
            color: "#4b5563",
            lineHeight: 1.5,
            marginBottom: 4,
          }}
        >
          Créez des menus personnalisés et générez automatiquement votre liste
          de courses. Simplifiez votre vie quotidienne avec notre application de
          planification de repas.
        </Typography>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            disableElevation
            endIcon={<ArrowForwardIosIcon />}
            sx={{
              backgroundColor: "#059668",
              fontWeight: 500,
              fontSize: "1.125rem",
              paddingX: "2rem",
              paddingY: "0.75rem",
            }}
          >
            Inscrivez-vous gratuitement{" "}
          </Button>
        </Link>
      </Container>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
            marginX: "auto",
          }}
          elevation={3}
        >
          <img
            src="/Planner_screenshot_landing_page.png"
            alt="Planner screenshot"
            width={"100%"}
          />
        </Paper>
      </Box>
      <Container sx={{ py: 8, textAlign: "center", my: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: "bold", color: "#2c7a7b" }}
        >
          Fonctions Clés
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  boxShadow: 3,
                  borderRadius: 2,
                  textAlign: "center",
                  height: "13em",
                }}
              >
                <CardContent>
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "text.secondary" }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
