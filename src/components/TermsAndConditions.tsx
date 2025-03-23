
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGame } from "@/contexts/GameContext";

const TermsAndConditions = () => {
  const { language } = useGame();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white border-red-500 hover:bg-red-500/20">
          {language === "es" ? "TÉRMINOS" : "TERMS"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-black/90 border-red-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-bold">
            {language === "es" ? "Términos y Condiciones del Juego de Bingo" : "Bingo Game Terms and Conditions"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] mt-4 pr-4">
          {language === "es" ? (
            <div className="space-y-4 text-sm">
              <section>
                <h3 className="font-bold">1. Aceptación de los Términos:</h3>
                <p>Al participar en este juego de Bingo, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, no podrás participar en el juego.</p>
              </section>
              
              <section>
                <h3 className="font-bold">2. Elegibilidad:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Para participar, debes tener al menos 18 años de edad o la mayoría de edad legal en tu jurisdicción.</li>
                  <li>Los jugadores son responsables de asegurarse de que el juego de azar esté permitido en su país o región.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">3. Apuestas:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>El monto mínimo de apuesta es 0.1 TON y el máximo es 2 TON.</li>
                  <li>Las apuestas deben realizarse dentro del período de 1 minuto establecido antes de que comience el juego.</li>
                  <li>Una vez cerrado el período de apuestas, no se aceptarán más apuestas para esa ronda.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">4. Comisión:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>La aplicación cobrará una comisión del 2% del pozo acumulado en cada ronda.</li>
                  <li>El pozo acumulado restante se distribuirá al ganador de la ronda.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">5. Pago al Ganador:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>El ganador recibirá el monto ganado a partir de 2 TON. Si el pozo acumulado es menor a 2 TON, no se realizará el pago y el monto se acumulará para la siguiente ronda.</li>
                  <li>El pago se realizará directamente a la billetera virtual vinculada por el ganador.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">6. Dinámica del Juego:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Los números se sortearán automáticamente cada 2 segundos.</li>
                  <li>El juego continuará hasta que un jugador complete el patrón de ganancia establecido.</li>
                  <li>En caso de empate, el pozo se dividirá entre los ganadores.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">7. Privacidad:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>La información personal proporcionada para vincular la billetera virtual se utilizará únicamente para procesar las transacciones y no se compartirá con terceros sin tu consentimiento.</li>
                  <li>Nos comprometemos a proteger tu privacidad y cumplir con las leyes de protección de datos aplicables.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">8. Responsabilidades del Jugador:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Los jugadores son responsables de mantener la seguridad de sus billeteras virtuales y de no compartir sus credenciales de acceso.</li>
                  <li>Cualquier actividad fraudulenta o abuso del sistema resultará en la descalificación inmediata y la posible suspensión de la cuenta.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">9. Limitación de Responsabilidad:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>No nos hacemos responsables por pérdidas o daños derivados de la participación en el juego, incluyendo pero no limitado a, errores técnicos, interrupciones del servicio o fallos en las transacciones.</li>
                  <li>El juego se proporciona "tal cual" y no ofrecemos garantías de ningún tipo respecto a su funcionamiento o disponibilidad.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">10. Modificaciones:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación.</li>
                  <li>Es responsabilidad del jugador revisar periódicamente los términos y condiciones para estar al tanto de cualquier cambio.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">11. Resolución de Disputas:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cualquier disputa relacionada con el juego se resolverá mediante negociación entre las partes.</li>
                  <li>Si no se alcanza un acuerdo, la disputa se someterá a la jurisdicción competente de acuerdo con las leyes aplicables.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">12. Contacto:</h3>
                <p>Para cualquier pregunta o inquietud relacionada con estos términos y condiciones, por favor contacta a nuestro equipo de soporte a través del correo electrónico: tomanton083@gmail.com.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <section>
                <h3 className="font-bold">1. Acceptance of Terms:</h3>
                <p>By participating in this Bingo game, you agree to comply with these terms and conditions. If you disagree with any of these terms, you will not be able to participate in the game.</p>
              </section>
              
              <section>
                <h3 className="font-bold">2. Eligibility:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To participate, you must be at least 18 years of age or the legal age of majority in your jurisdiction.</li>
                  <li>Players are responsible for ensuring that gambling is permitted in their country or region.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">3. Betting:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The minimum bet amount is 0.1 TON and the maximum is 2 TON.</li>
                  <li>Bets must be placed within the 1-minute period established before the game begins.</li>
                  <li>Once the betting period is closed, no more bets will be accepted for that round.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">4. Commission:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The application will charge a 2% commission from the accumulated pot in each round.</li>
                  <li>The remaining accumulated pot will be distributed to the winner of the round.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">5. Winner Payment:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The winner will receive the winning amount starting from 2 TON. If the accumulated pot is less than 2 TON, no payment will be made, and the amount will accumulate for the next round.</li>
                  <li>Payment will be made directly to the virtual wallet linked by the winner.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">6. Game Dynamics:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Numbers will be drawn automatically every 2 seconds.</li>
                  <li>The game will continue until a player completes the established winning pattern.</li>
                  <li>In the event of a tie, the pot will be divided among the winners.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">7. Privacy:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Personal information provided to link the virtual wallet will be used solely to process transactions and will not be shared with third parties without your consent.</li>
                  <li>We are committed to protecting your privacy and complying with applicable data protection laws.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">8. Player Responsibilities:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Players are responsible for maintaining the security of their virtual wallets and not sharing their access credentials.</li>
                  <li>Any fraudulent activity or system abuse will result in immediate disqualification and possible account suspension.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">9. Limitation of Liability:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>We are not responsible for losses or damages resulting from participation in the game, including but not limited to technical errors, service interruptions, or transaction failures.</li>
                  <li>The game is provided "as is" and we offer no guarantees of any kind regarding its operation or availability.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">10. Modifications:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>We reserve the right to modify these terms and conditions at any time. Modifications will take effect immediately after publication.</li>
                  <li>It is the player's responsibility to periodically review the terms and conditions to stay informed of any changes.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">11. Dispute Resolution:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Any dispute related to the game will be resolved through negotiation between the parties.</li>
                  <li>If an agreement is not reached, the dispute will be submitted to the competent jurisdiction in accordance with applicable laws.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold">12. Contact:</h3>
                <p>For any questions or concerns related to these terms and conditions, please contact our support team via email: tomanton083@gmail.com.</p>
              </section>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
