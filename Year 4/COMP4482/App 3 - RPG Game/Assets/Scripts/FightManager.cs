using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FightManager : MonoBehaviour
{

    public static FightManager instance;
    public bool fightActive;

    public Transform playerPosition;
    public Transform enemyPosition;

    public BattlePlayer playerPrefab;
    public BattlePlayer[] enemyPrefabs;

    public GameObject fightScene;
    public List<BattlePlayer> activeFighters = new List<BattlePlayer>();

    public BattlePlayer player;
    public BattlePlayer enemy;
    public BattlePlayer currentTurnPlayer;

    public bool playersTurn = true;
    public GameObject playerActions;

    public FightMove[] movesList;
    public bool turnWaiting;

    public GameObject attackEffect;

    public Damage damage;

    public Slider playerHealthSlider;
    public Text playerHealthText;

    public Slider enemyHealthSlider;
    public Text enemyHealthText;


    // Start is called before the first frame update
    void Start()
    {
        instance = this;
        DontDestroyOnLoad(gameObject);
    }

    // Update is called once per frame
    void Update()
    {
   
        if (fightActive)
        {
           
            if (turnWaiting)
            {

                if (playersTurn)
                {
                    playerActions.SetActive(true);

                }
                else
                {
                    playerActions.SetActive(false);
                    StartCoroutine(EnemyMove());
                }
            }

            CheckBattleForDeadPlayers();
        }

    
    }

    public void StartFight(string enemyName)
    {

        if (!fightActive)
        {
            fightActive = true;
            GameManager.instance.fightActive = true;
            fightScene.SetActive(true);

            var position = Camera.main.transform.position;
            transform.position = new Vector3(position.x, position.y, transform.position.z);

          

            BattlePlayer activePlayer = Instantiate(playerPrefab, playerPosition.position, playerPosition.rotation);
            activePlayer.transform.parent = playerPosition;

            PlayerStats stats = GameManager.instance.playerStats;
            activePlayer.currentHp = stats.currentHP;
            activePlayer.strength = stats.strenth;
            activePlayer.power = stats.weaponPower;
            activePlayer.defence= stats.defence;
            activePlayer.armourPower= stats.armourPower;


            activeFighters.Add(activePlayer);
           

            for (int i=0;i<enemyPrefabs.Length;i++)
            {
 
                if (enemyPrefabs[i].playerName == enemyName)
                {
                    BattlePlayer _enemy = Instantiate(enemyPrefabs[i], enemyPosition.position, enemyPosition.rotation);
                    _enemy.transform.parent = enemyPosition;
                    activeFighters.Add(_enemy);
                    enemy = _enemy;
                }
                
            }


            turnWaiting = true;
            player = activePlayer;

          
            NextTurn();
        }
    }

    public void UpdateHealthSliders()
    {
        playerHealthSlider.maxValue = player.maxHp;
        playerHealthSlider.value = player.currentHp;
        playerHealthText.text = "Health: " + player.currentHp + "/" + player.maxHp;

        enemyHealthSlider.maxValue = enemy.maxHp;
        enemyHealthSlider.value = enemy.currentHp;
        enemyHealthText.text = "Health: " + enemy.currentHp + "/" + enemy.maxHp;
    }

    public void NextTurn()
    {
        // switch turn
        if (playersTurn)
        {
            playersTurn = false;
            currentTurnPlayer = enemy;
        } else
        {
            playersTurn = true;
            currentTurnPlayer = player;
        }

        turnWaiting = true;

        UpdateHealthSliders();


        CheckBattleForDeadPlayers();
         

    }

    public void CheckBattleForDeadPlayers()
    {
        if (!fightActive)
        {
            return;
        }

        bool enemyDead = false;
        bool playerDead = false;

        foreach (BattlePlayer player in activeFighters)
        {
            if (player.currentHp <= 0)
            {
                player.currentHp = 0;

                if (player.isPlayer)
                {
                    playerDead = true;
                } else
                {
                    enemyDead = true;
                }
                // user is dead...
            }

        }

        if (enemyDead || playerDead)
        {
            fightScene.SetActive(false);
            GameManager.instance.fightActive = false;
            fightActive = false;
        }
    }

    public IEnumerator EnemyMove()
    {
        turnWaiting = false;
        yield return new WaitForSeconds(1f);
        AttackPlayer();
        yield return new WaitForSeconds(1f);
        NextTurn();
    }

    //public IEnumerator PlayerMove()
    //{
    //    turnWaiting = false;
    //    yield return new WaitForSeconds(1f);
    //    AttackEnemy();
    //    yield return new WaitForSeconds(1f);
    //    NextTurn();
    //}

    //public void AttackButtonPress()
    //{
    //    StartCoroutine(PlayerMove());
    //}


    //enemy attacks player
    public void AttackPlayer()
    {
 
        int selectedAttack = Random.Range(0, enemy.movesAvailable.Length);

        for (int i = 0; i < movesList.Length; i++)
        {
            if (movesList[i].moveName == enemy.movesAvailable[selectedAttack])
            {
                Instantiate(movesList[i].animation, player.transform.position, player.transform.rotation);
            }
        }


        Damage(player, enemy.power);

    }

    public void AttackEnemy()
    {
        Debug.Log("A");
        int selectedAttack = Random.Range(0, player.movesAvailable.Length);

        for (int i = 0; i < movesList.Length; i++)
        {
            if (movesList[i].moveName == player.movesAvailable[selectedAttack])
            {
                Instantiate(movesList[i].animation, enemy.transform.position, enemy.transform.rotation);
            }
        }


        Damage(enemy, player.power);
        NextTurn();
    }

    public void Damage(BattlePlayer toAttack, int power)
    {

        Instantiate(attackEffect, currentTurnPlayer.transform.position, currentTurnPlayer.transform.rotation);

        float attackPower = currentTurnPlayer.strength + currentTurnPlayer.weaponPower;
        float defencePower = toAttack.defence + toAttack.armourPower;

        int damage = Mathf.RoundToInt((attackPower / defencePower) * power * Random.Range(.9f, 1.1f));

        toAttack.currentHp -= damage;

        Instantiate(this.damage, toAttack.transform.position, toAttack.transform.rotation).UpdateDamage(damage);
        UpdateHealthSliders();
    }

    public void RunAway()
    {
        fightActive = false;
        GameManager.instance.fightActive = false;
        fightScene.SetActive(false);
    }
}
